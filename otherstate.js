function washroom(){
    background(ws);
    if(ls==0){
        dog.addImage(bh);
        dog.scale=0.75;
        dog.x=width/2;
        dog.visible=true;
        sp.visible=true;
        shr.visible=true;
        ls=1;gs=0;
    }
    fill("purple");
    textSize(21);
    text("Use soap and shower to give "+gn+" bath",dog.x-200,dog.y-200);
    if(sp.isTouching(ch)){
        var k= createSprite(sp.x,sp.y,10,10);
        k.rotation=random(0,180);
        k.addImage(bb);k.scale=random(125,130)/1000;
        si.add(k);
    }
    if((mouseOver(sp)&&sp.visible==true)||(mouseOver(shr)&&shr.visible==true)){
        cursor('pointer');
    }else{cursor('default');}

    if(mousePressedOver(sp)){
        sp.x=mouseX;
        sp.y=mouseY;
    }else{sp.x=470;sp.y=250;}
    if((mousePressedOver(shr)&&shr.visible==true)||l1==1){
        l1=1;
        if(yk<=ch.y-60){
            image(wti,shr.x-60,shr.y+yk+65,150,150);
            image(wti,shr.x-60,shr.y+yk+5,150,150);
            yk+=15;
        }else{yk=0;}
        if(ss>=15){kdes();l1=0;}
        else{ss++;}
    }

}

function kdes(){
    if(si.size()!=0){
        for(var h=0;h<si.size();h++){
            var f=si.get(h);
            si.remove(f);
            f.destroy();
        }
    }
    ss=0;
    yk=0;
}

function bedroom(){
    background(bd);
    cursor('default');
    fill(color((xc-yc)/3,(xc+yc)/4,(xc-yc)/5));
    textSize(25);text(gn+" is sleeping",200,250);
    if(xc<=650&&yc>=-50){
        image(zz,xc,yc,xc/3,xc/3);
        xc+=5;yc-=5;
    }else{xc=185;yc=275;}
    ls=0;gs=0;
}

function garden(){
    background(grd);
    if(gs==0){
    dog.addImage(dg);
    dog.scale=0.3;
    dog.x=width/2;
    dog.visible=true;
    gs=1;ls=0;
    }
    textSize(20);
    fill("red");
    text("press arrow keys to play with "+gn,dog.x-130,dog.y-125);
    if(keyDown(DOWN_ARROW)&&!keyDown(LEFT_ARROW)&&!keyDown(RIGHT_ARROW)){
    dog.addImage(grd1);
    dog.scale=0.65;dog.y=375;
    }else{dog.addImage(dg);dog.scale=0.3;dog.y=400;dog.mirrorX(1);}
    if(keyDown(LEFT_ARROW)&&!keyDown(RIGHT_ARROW)&&!keyDown(UP_ARROW)&&(dog.x>=dog.width/2-50)){
    dog.addImage(rr);dog.x-=7.5;
    }
    if(keyDown(RIGHT_ARROW)&&!keyDown(LEFT_ARROW)&&!keyDown(UP_ARROW)&&(dog.x<=width-dog.width/2+50)){
    dog.mirrorX(-1);dog.addImage(rr);dog.x+=7.5;
    }
}