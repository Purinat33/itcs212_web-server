class Banner extends HTMLElement{
    constructor(){
        super();
    }
    

    connectedCallback(){
        this.innerHTML = `
        <style>

        @font-face {
         font-family: 'Poppins';
         src: url('/components/fonts/Poppins/Poppins-Light.ttf');
        }

        * {
         margin: 0;
         padding: 0;
         box-sizing: border-box;
         /* font-family: 'Open_Sans', Times, serif; */
        }
   
      #head {
         font-family: 'Poppins';
         width: 100%;
         height: 100px;
         background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url('../../img/bg2.jpeg');
         color: white;
         display: flex;
         justify-content: space-around;
         align-items: center;
      }
   
      nav {
         width: 100%;
         height: 100px;
         /* background: wheat; */
         color: #fff;
         display: flex;
         justify-content: space-around;
         align-items: center;
      }
   
      .logo {
         font-size: 2em;
         letter-spacing: 2px;
      }
   
      .menu a {
         text-decoration: none;
         color: #fff;
         padding: 10px 20px;
         font-size: 20px;
      }
   
      .menu a:hover {
         border: 1px solid indianred;
         background: transparent;
      }
   
   
      .register a {
         text-decoration: none;
         color: #fff;
         padding: 10px 20px;
         font-size: 20px;
         border-radius: 8px;
         background: indianred;
      }
   
      .register a:hover {
         border: 1px solid indianred;
         background: transparent;
      }
        </style>

        <div id="head">
        <nav>
          <div class="logo">
            OnlyGames
          </div>
          <div class="menu">
              <a href="/">Home</a>
              <a href="/store/browse">Browse</a>
              <a href="/about">Support</a>
              <a href="/store/search">Search</a>
          </div>

          <div class="register">
            <a href="/auth/login">Login</a>
          </div>
        </nav>
      </div>
      `
    }
}

customElements.define('banner-custom', Banner);