document.addEventListener("DOMContentLoaded", function () {
            document.addEventListener("click", function (e) {
                if (e.target.classList.contains("js-smooth-scroll")) {
                    event.preventDefault();
                    let id = e.target.getAttribute('href');
                    let linkedTag = document.getElementById(id);
                    
                    if (linkedTag) {
                        let top = linkedTag.offsetTop;   
                            window.scrollTo(0, top); 
//                            $('html, body').animate({scrollTop: top}, 1000);
                    }
                }
            });  
});