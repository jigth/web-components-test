const template = document.createElement('template');

template.innerHTML = `<style>
.card-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 600px;
    background: orange;
    margin: 20px auto;
    border-radius: 10px;
}

.info-container {
    margin: 20px;
}

img { 
    width: 180px;
    height: 300px;
    border-radius: inherit;
}

h3 {
    color: red;
}


</style>

<div class='card-container'>
    <img />
    <div class='info-container'>
        <strong> Name: </strong> <em></em>
        <p><strong> Description: </strong> <slot name='description' /></p>
    </div>
</div>
`;

class UserCard extends HTMLElement {
    
    constructor() {
        super();

        // Create shadow DOM (called 'root') and append the content of the template
        // element defined above to it!
        const root = this.attachShadow({ mode: 'open' });
        root.appendChild(template.content.cloneNode(true));
    }


    // Allow for the attributes of the component to be observed
    static observedAttributes = ['name', 'photo'];

    setName (nameAttribute) {
        this.shadowRoot.querySelector('.card-container > .info-container em').innerHTML =
        nameAttribute;
    }

    setPhoto (photoAttribute) {
        this.shadowRoot.querySelector('.card-container > img').src = 
        photoAttribute;
    }
    
    // This hook (or lifecycle method) is triggered whenever a Usercard is inserterted into the DOM
    connectedCallback() {
        console.log(`Element ${this.getAttribute('name')} created succesfully.`);
    }

    // This hook is triggered whenever a UserCard is deleted or removed from the DOM
    disconnectedCallback() {
        console.log(`Element ${this.getAttribute('name')} destroyed.`);
    }

    // This hook is triggered whenever a Usercard attribute is changed (add, update, replace, remove)
    attributeChangedCallback (attributeName, oldValue, newValue) {
        console.table({attributeName, oldValue, newValue});
        if ( attributeName === "name" ) { 
            this.setName (newValue);
        } else if ( attributeName === "photo" ) {
            this.setPhoto (newValue);
        }
    }
}

window.customElements.define('user-card', UserCard);