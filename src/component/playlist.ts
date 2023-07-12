// @ts-nocheck
function xmlToJS(xml) {
  let currentId = "";
  const tracks = {};
  const sequence = [];
  const playlist = {
    meta: {},
  };
  let sequenceTrigger = false;
  var treeWalker = document.createTreeWalker(
    xml,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: function (node) {
        return NodeFilter.FILTER_ACCEPT;
      },
    },
    false
  );
  var currentNode = treeWalker.currentNode;
  while (currentNode) {
    currentNode = treeWalker.nextNode();
    if (currentNode) {
      if (currentNode.textContent === "Tracks") {
        Array.from(currentNode.nextSibling.nextSibling.children).forEach(
          (node) => {
            if (node.nodeName === "key") {
              currentId = node.textContent;
              tracks[currentId] = {};
            }
            if (node.nodeName === "dict") {
              Array.from(node.children).forEach((node) => {
                if (node.nodeName === "key") {
                  tracks[currentId][node.textContent.toString()] =
                    node.nextSibling.textContent;
                }
              });
            }
          }
        );
      }
      if (currentNode.textContent === "Playlists") {
        sequenceTrigger = true;
      }
      if (sequenceTrigger) {
        if (
          currentNode.textContent === "Name" ||
          currentNode.textContent === "Description" ||
          currentNode.textContent === "Playlist ID" ||
          currentNode.textContent === "Playlist Persistent ID"
        ) {
          playlist.meta[currentNode.textContent] =
            currentNode.nextSibling.textContent;
        }
      }
      if (sequenceTrigger && currentNode.textContent === "Track ID") {
        sequence.push({
          index:
            Array.from(currentNode.parentNode.parentNode.children).indexOf(
              currentNode.parentNode
            ) + 1,
          id: currentNode.nextSibling.textContent,
          meta: tracks[currentNode.nextSibling.textContent],
        });
      }
    }
  }

  playlist.sequence = sequence;
  playlist.tracks = tracks;
  return playlist;
}

function convertPlaylistXMLToJS(playlistNode) {
  const parser = new DOMParser();
  const XMLString = playlistNode.innerHTML
    .toString()
    .replace(/<\!--\?xml\sversion="1.0"\sencoding="UTF-8"\?--\>/gm, "");
  const playlistXML = parser.parseFromString(XMLString, "application/xml");
  return xmlToJS(playlistXML);
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function toTimecode(str) {
  const ms = parseInt(str);
  var seconds = (ms / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes - hours * 60;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
  }
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  if (hours != "") {
    return hours + ":" + minutes + ":" + seconds;
  }
  return minutes + ":" + seconds;
}

class AppleMusicPlaylist extends HTMLElement {
  constructor() {
    super();
    this.playlist = [];
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        :host {
            width: 100%;
            line-height: 1.5em;
        }
        :host, :host *, :host *:before, :host *:after {
            box-sizing: border-box;
        }
        .title {
            font-size: 1.5em;
        }
        .track {
            font-size: 1em;
            width: 100%;
            padding-bottom: 1em;
        }
        .track span {
            margin-right: 0.5em;
        }
        .track span:first-child {
            display: inline-block;
            width: 20px;
        }
        .track span:nth-child(2) {
            font-weight: bold;
        }
        </style>
        <div class="container"></div>
        `;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
  static get observedAttributes() {
    return ["xml-selector"];
  }
  attributeChangedCallback(attr, prev, next) {
    switch (attr) {
      case "xml-selector":
        this.parse(next);
    }
  }
  parse(xmlPlaylistSelector) {
    const xml = document.querySelectorAll(xmlPlaylistSelector);
    this.playlists = Array.from(xml).map((playlistNode) =>
      convertPlaylistXMLToJS(playlistNode)
    );
    this.playlists.forEach((playlist) => this.render(playlist));
  }
  render(playlist) {
    const root = this.shadowRoot.querySelector(".container");
    root.innerHTML = "";

    const title = document.createElement("h3");
    title.classList.add("title");
    title.innerText = playlist.meta["Name"];

    const trackContainer = document.createElement("div");

    trackContainer.classList.add("tracks");

    for (let i = 0; i < playlist.sequence.length; i++) {
      const track = document.createElement("div");

      track.classList.add("track");

      const trackNumber = document.createElement("span");
      const trackName = document.createElement("span");
      const trackArtist = document.createElement("span");
      const trackDuration = document.createElement("span");

      trackNumber.innerHTML = `${playlist.sequence[i].index.toString()}&#32;`;
      trackArtist.innerHTML = `${playlist.sequence[i].meta["Artist"]}&#32;&#44;`;
      trackName.innerHTML = `${toTitleCase(
        playlist.sequence[i].meta["Name"]
      )}&#32;`;
      trackDuration.innerHTML = `${toTimecode(
        playlist.sequence[i].meta["Total Time"]
      )}&#32;`;

      track.appendChild(trackNumber);
      track.appendChild(trackArtist);
      track.appendChild(trackName);
      track.appendChild(trackDuration);
      trackContainer.appendChild(track);
    }

    root.appendChild(title);
    root.appendChild(trackContainer);
  }
}

customElements.define("apple-playlist", AppleMusicPlaylist);

export { AppleMusicPlaylist };
