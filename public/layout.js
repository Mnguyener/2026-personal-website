document.addEventListener("DOMContentLoaded", function () {
  // Page has finished loading. Now, do things.
  loadLayoutByPetraPixel();

  // Add any custom JavaScript code here...
  loadTheme();
});

function loadLayoutByPetraPixel() {
  const mainEl = document.querySelector("main");
  if (!mainEl) return;
  mainEl.insertAdjacentHTML("beforebegin", headerHTML());
  mainEl.insertAdjacentHTML("afterend", footerHTML());
  giveActiveClassToCurrentPage();
}
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  // save current theme to localStorage
  localStorage.setItem("theme", isDark ? "dark-mode" : "light-mode");
}
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const button = document.querySelector("button.button-dark-mode");
  if (savedTheme === "dark-mode") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.add("light-mode");
  }
  button.addEventListener("click", toggleTheme);
}

const nesting = getNesting();

function headerHTML() {
  // ${nesting} outputs "./" or "../" depending on current page depth.
  // You can use it to refer to images etc.
  // Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

  return `
  
      <!-- =============================================== -->
      <!-- HEADER -->
      <!-- =============================================== -->

      <header>

        <div class="header-content">
	        <div class="header-title">Michy's Everything Site</div>
	        
	        <!-- NAVIGATION -->
	        <nav>
	          <ul>
	            <li><a href="/">Home</a></li>
	            <li><a href="/page1">Georgio</a></li>
	            <li><a href="/page2">Blogio</a></li>
	            <li><a href="/page3">Q&A</a></li>
	            <li>
	                <strong>Submenu (hover to show)</strong>
	                <ul>
	                  <li><a href="/page-a">Page A</a></li>
	                  <li><a href="/page-b">Page B</a></li>
	                  <li><a href="/page-c">Page C</a></li>
	                  <li><a href="/page-d">Page D</a></li>
	                  <li><a href="/page-e">Page E</a></li>
	                </ul>
	            </li>
	          </ul>
	        </nav>
        
        </div>

      </header>   
	  
        
      <!-- =============================================== -->
      <!-- LEFT SIDEBAR -->
      <!-- =============================================== -->

      <aside class="left-sidebar">
	  
        
        <div class="sidebar-section">
          <div class="sidebar-title">About Me</div>
          <p>*°*✵ 23 y/o *°✵</p>
          <p>·.*• software engineer ·.*•</p>
          <p>✦☆.· she/her ✦☆.·</p>

        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Last Game I Played</div>
          <blockquote>
            <p>Hello Kitty Island Adventures</p>
            <img src="img/hello-kitty.gif">
          </blockquote>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Current Obsessions</div>
          <ul>
            <li>Snoopy</li>
            <li>Pocket notebooks</li>
            <li>Pickleball</li>
            <li>Pompompurin</li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">PetraPixel's Website</div>
          <div class="marquee">
          	<a href="https://petrapixel.neocities.org/" target="_blank"><img src="https://cdn.jsdelivr.net/gh/petracoding/petrapixel.neocities.org@latest/public/img/linkback.gif" alt="petrapixel"></a>
          </div>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Wall of stamps</div>
          <div>
           <img src="img/goose.gif"> <img src="img/rice.jpg"> <img src="img/join_logo.gif"> <img src="img/js-warning.gif"> <img src="img/dog of wisdom.gif"> <img width="175" height="48" src="img/nintendo-switch.jpg"> <img src="img/i-love-my-computer.gif"> 
          </div>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Song I'm Currently Obsessed With</div>
          <blockquote style="border:2px solid">
            <div class="marquee">
              <a href="https://www.youtube.com/watch?v=uJ4RoZpCxDU&list=RDAPNrkRFYF_8&index=3" target="_blank" alt="youtube link">When I Look at You</a>    
            </div> 
            </blockquote>
            <div class="images">
              <img src="https://sakuradreams.neocities.org/Images/Purin104.gif">
              <img src="https://sakuradreams.neocities.org/Images/Purin74.gif">
            </div>
        </div>      
      </aside>
      `;
}

function footerHTML() {
  // ${nesting} outputs "./" or "../" depending on current page depth.
  // You can use it to refer to images etc.
  // Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

  return `


      <!-- =============================================== -->
      <!-- FOOTER -->
      <!-- =============================================== -->

      <footer>
            <div>Check out my github <a href="https://github.com/Mnguyener">here!</a> Template generated with <a href="https://petrapixel.neocities.org/coding/layout-generator.html">petrapixel's layout generator</a>.</div>
      </footer>`;
}

/* Do not edit anything below this line unless you know what you're doing. */

function giveActiveClassToCurrentPage() {
  const els = document.querySelectorAll("nav a");
  [...els].forEach((el) => {
    const href = el.getAttribute("href").replace(".html", "").replace("#", "");
    const pathname = window.location.pathname.replace("/public/", "");
    const currentHref = window.location.href.replace(".html", "") + "END";

	/* Homepage */
    if (href == "/" || href == "/index.html") {
      if (pathname == "/") {
        el.classList.add("active");
      }
    } else {
      /* Other pages */
      if (currentHref.includes(href + "END")) {
        el.classList.add("active");

        /* Subnavigation: */
		
        if (el.closest("details")) {
          el.closest("details").setAttribute("open", "open");
          el.closest("details").classList.add("active");
        }

        if (el.closest("ul")) {
          if (el.closest("ul").closest("ul")) {
          	el.closest("ul").closest("ul").classList.add("active");
          }
        }
      }
    }
  });
}

function getNesting() {
  const numberOfSlashes = window.location.pathname.split("/").length - 1;
  if (numberOfSlashes == 1) return "./";
  return "../".repeat(numberOfSlashes - 1);
}
function darkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
}
