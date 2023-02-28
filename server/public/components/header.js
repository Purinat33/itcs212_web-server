/*
Credit:

https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

*/

class Header extends HTMLElement{
    constructor(){
        super();
    }
//Define code snippets
    connectedCallback(){
        this.innerHTML = `

        <style>

        @font-face{
            font-family: "Poppins";
            src: url('../components/fonts/Poppins/Poppins-Regular.ttf')
        }

        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        body{
            width: 100%;
            height: 100vh;
            background: rgb(240,239,243);
        }

        .credit{
            position: absolute;
            text-decoration: none;
            bottom: 1px;
            right: 1px;
            color:black;
        }

        .credit a:valid{
            text-decoration: none;
            color: black;
        }

        .credit a:visited{
            text-decoration: none;
            color: black;
        }

        header{
            width: 100%;
            height: 100vh;
            background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url('../img/bg2.jpeg');
            background-size: cover; 
            font-family: 'Poppins',sans-serif;

        }

        nav{
            width: 100%;
            height: 100px;
            background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url('../img/bg2.jpeg');; 
            color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .logo{
            font-size: 2em;
            letter-spacing: 2px;

        }

        .menu a{
            text-decoration: none;
            color: white;
            padding: 10px 20px;
            font-size: 20px;
        }

        .menu a:hover{
            border: 1px solid indianred;
            background: transparent;
        }

        .register a{
            text-decoration: none;
            color: white;
            padding: 10px 20px;
            font-size: 20px;
            border-radius: 8px;
            background: indianred;

        }

        .register a:hover{
            border: 1px solid indianred;
            color: white;
            background: transparent;
        }

        .h-text{
            position: absolute;
            top: 50%;
            left: 50%;
            max-width: 650px;
            transform: translate(-50%, -50%);
            text-align: center;
            color: white;
        }

        .h-text span{
            letter-spacing: 5px;
            font-size: 1.2em;
        }

        .h-text h1{
            font-size: 3.5em;
        }

        .h-text a{
            text-decoration: none;
            background: indianred;
            padding: 10px 20px;
            color: white;
            letter-spacing:  5px;
            transition: 0.4s; 
        }

        .h-text a:hover{
            border: 1px solid indianred;
            background: transparent;
        }
        </style>

        <nav>
            <div class="logo">
                OnlyGames
            </div>
            <div class="menu">
                <a href="../index.html">Home</a>
                <a href="catalogue.html">Browse</a>
                <a href="about.html">Support</a>
                <a href="search.html">Search</a>
            </div>

            <!--If user is logged in, whether through cookie or regustered-->
            <script type="text/javascript">

            </script>

            <div class="register">
                <!-- will change to logout once logged in -->
                <a href="login.html" target="_self">Login</a>
            </div>
        </nav>
        `
    }

}
    
customElements.define('head-banner', Header);