const template = document.createElement("template");

template.innerHTML = `
  <style>
    h2 {color: coral}

    .user-card {
      background: #f4f4f4;
      width: 500px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 1px;
      margin-bottom: 15px;
      border-bottom: darkorchid 5px solid;
    }

    .user-card img {
      width: 100%;
    }

    .user-card button {
      cursor: pointer;
      background: darkorchid;
      color: #fff;
      border: 0;
      border-radius: 5px;
      padding: 5px 10px;
    }
  </style>
  <div class="user-card">
    <img />
    <div>
      <h2></h2>

      <div class="info">
        <p><slot name="email"/> </p>
        <p><slot name="phone"/></p>
      </div>

      <button id="toggleInfo">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h2").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
  }

  toggleInfo() {
    const infoContainer = this.shadowRoot.querySelector(".info");
    const toggleBtn = this.shadowRoot.querySelector("#toggleInfo");

    this.showInfo = !this.showInfo;

    if (this.showInfo) {
      infoContainer.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    } else {
      infoContainer.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggleInfo")
      .addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggleInfo").removeEventListener();
  }
}

window.customElements.define("user-card", UserCard);
