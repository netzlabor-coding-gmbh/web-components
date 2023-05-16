
class Popup extends HTMLElement {
    constructor() {
        super();

         // Create a shadow root and put the content inside it
        const shadowRoot = this.attachShadow({mode: 'open'});
        
        // Create overlay and paste it inside a shadow root
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        shadowRoot.appendChild(this.overlay);

        // Create wrapper and paste it inside a shadow root
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'wrapper';
        shadowRoot.appendChild(this.wrapper);

        // Create div text and paste it inside a shadow root
        this.text = document.createElement('slot');
        this.text.name = 'text';
        this.wrapper.appendChild(this.text);

        // Create close button  and paste it inside a shadow root
        this.button = document.createElement('button');
        this.button.textContent = '✕';
        this.button.className = 'button-close';
        this.wrapper.appendChild(this.button);

        // Create styles
        this.styles = document.createElement('style');
        this.styles.textContent = `
            :host {
                display: none;
                font-family: "proxima-nova", sans-serif;
                font-size: 15px;
                font-weight: 300;
                color: #333;
            }
            :host .wrapper {
                position: absolute;
                transform: translate(-50%,-50%);
                left: 50%;
                top: 50%;
                text-align: center;
                max-width: 550px;
                padding: 30px 25px;
                background: #efefef;
                border-bottom: 1px solid #b4b4b4;
                box-shadow: 0 0 20px 0 rgba(0,0,0,.4);
            }
            :host .overlay {
                display: block;
                background-color: rgba(0,0,0,.3);
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0px;
                left: 0px;
                justify-content: center;
                align-items: center;
            }
            :host .button-close {
                position: absolute;
                width: 17px;
                height: 17px;
                right: 10px;
                top: 10px;
                font-size: 11px;
                font-family: unset;
                font-weight: 300;
                cursor: pointer;
                color: #666977;
                flex: 0 0 auto;
                display: block;
                padding-right: 0;
                padding-left: 0;
                background: rgba(255,255,255,.4);
                border: 1px solid #666977;
                border-radius: 50%;
            }
        `;

        shadowRoot.appendChild(this.styles);


        // Check if popup window has been already closed
        if(this.isClosed()) return;


        // Show popup first time
        setTimeout(() => {
            this.style = 'display: block';
        }, 30000);
        
    }

    // Check if smt has in localstorage
    isClosed() {
       return localStorage.getItem("closed")
    }

    // Close popup and add setItem to localstorage
    close() {
       this.style = 'display: none';
       localStorage.setItem("closed", 1);
    }


    // Add events by clicking button or overlay
    connectedCallback() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault;
            this.close();
        });

        this.overlay.addEventListener('click', () => {
            this.close();
        });

    }

}

customElements.define('pop-up', Popup);