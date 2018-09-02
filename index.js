import * as p5 from './p5.min.js'


let s = (sk)  =>{
    sk.setup = () =>  {
        sk.createCanvas(400, 400);
    };
    sk.draw = () => {
        sk.fill(230);
        sk.rect(50,50,80,80)
    };
};

const P5 = new p5(s);


