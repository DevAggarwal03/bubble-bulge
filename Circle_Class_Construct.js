let canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');


let mouse = {
    x : undefined,
    y : undefined
}

let circleArray = [];
let maxLimit = 50;
let colorArray = [
    "#042940",
    "#005C53",
    "#9FC131",
    "#DBF227",
    "#D6D58E"
]





window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

})

function init(){
    circleArray = []

    for(let i = 0; i < 4000; i++){
        let r = Math.random() * 4 + 1;
        let x = Math.random() * window.innerWidth
        let y = Math.random() * window.innerHeight
        let dx = (Math.random()-0.5) * 2;
        let dy = (Math.random()-0.5) * 2;
        circleArray.push(new Circle(x, y, r, dx, dy))
    }
    
}

window.addEventListener('resize', function(){
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        init();
    }
)


function Circle(x, y, r, dx, dy){
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.MinRad = r;
    this.MaxRad = 100;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fill()
        c.fillStyle = this.color;
    }

    this.update = function(){
        if(this.x + this.r > window.innerWidth || this.x - this.r < 0){
            this.dx = - this.dx;
        }
        if(this.y + this.r > window.innerHeight || this.y - this.r < 0){
            this.dy = - this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > 0){
          if(this.r < this.MaxRad)  {
            this.r += 2
          }
        }
        else if(this.r > this.MinRad){
            this.r -= 1;
        }
        this.draw();
    }
}




function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}


animate();





