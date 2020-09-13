var dog,database,foods,bow,c=0,t=0,gs=0,ls=0;j=0;
var dg,hdg,sdg,s1,s2=0,s3=0,s4=0,ml,tb,bl,kit;
var ltfed,tri,time,cur,ch,sck,bh,ss=0,yk=0;
var b1,b2,n1,nm,gn,grd,grd1,bd,ws,rr,zz,sp,spi,bb,shr,l1=0;
var t2=0,xc=185,yc=275,si,shri,wti;

function preload(){
   hdg=loadImage("happydog.png");
   dg=loadImage("Dog.png");
   sdg=loadImage("Lazy.png");
   ml=loadImage("milk.png");
   tb=loadImage("wood2.png");
   bl=loadImage("bowlbg.png");
   grd=loadImage("Garden.png");
   grd1=loadImage("gardenc.png");
   rr=loadImage("runningLeft.png");
   bd=loadImage("BedRoom.png");
   zz=loadImage("zz.png");
   ws=loadImage("WashRoom.png");
   bh=loadImage("bathing.png");
   spi=loadImage("soap.png");
   bb=loadImage("bubble.png");
   shri=loadImage("shower.png");
   wti=loadImage("water.png");
}

function setup() {
  createCanvas(600,600);
  database=firebase.database();
  var st,dt,ft,nt;
  st=database.ref('state');
  st.on("value",readstate);
  dt = database.ref('food');
  dt.on("value",readStock);
  ft = database.ref('feedTime');
  ft.on("value",readTime);
  nt=database.ref('name');
  nt.on("value",readname);

  ch=createSprite(450,400,125,150);
  ch.visible=false;
  shr=createSprite(275,50,75,75);
  shr.addImage(shri);shr.scale=1;
  shr.visible=false;
  dog=createSprite(450,400);
  dog.scale=0.3;dog.visible=false;
  bow=createSprite(150,475,60,60);
  bow.addImage(bl);bow.visible=false;
  bow.scale=0.3;
  sp=createSprite(470,250,50,25);
  sp.addImage(spi);sp.scale=0.75;
  sp.visible=false;
  si=new Group();

  b1=createButton("feed");
  b1.hide();
  b2=createButton("get food");
  b2.hide();
  n1=createButton("change");
  nm=createInput("new name");
  b1.position(475+350,535);
  b2.position(405+350,535);
  n1.position(245+350,565);
  nm.position(50+350,565);
  b1.mousePressed(feeddog);
  b2.mousePressed(gt);
  n1.mousePressed(cng);
}
  {
function readstate(data){
  sck=data.val();
}

function readStock(data){
  foods=data.val();
}

function readTime(data){
  ltfed=data.val();
}

function readname(data){
  gn=data.val();
}
  }

function update(x){
  database.ref('/').update({
    state:x
  });
}

function draw() {
  cur=hour();
  if(sck!==undefined){nm.show();n1.show();}
  else{
    background(255,255,255);
    nm.hide();
    n1.hide();
  }
  ch.x=dog.x;ch.y=dog.y;
  if(gn=="new"+" name"||gn=="name"||gn==undefined){
    gn="him";
  }
  if(ltfed!==undefined){
    if(cur==ltfed+1){
      si.removeSprites();
      sp.visible=false;
      shr.visible=false;
      update("garden");
    }else if(cur==ltfed+2){
      si.removeSprites();
      dog.visible=false;
      sp.visible=false;
      shr.visible=false;
      update("bedroom");
    }else if(cur>ltfed+2&&cur<=ltfed+4){
      update("washroom");
    }else{si.removeSprites();sp.visible=false;shr.visible=false;update("hungry");}
  }
  if(sck!=="hungry"){      
    bow.visible=false;
    if(tri!=undefined){tri.van(false);
      b1.hide();b2.hide();
    } 
  }

  if(t2>=30){
  if(sck=="garden"){
    garden();
  }else if(sck=="washroom"){
    washroom();
  }else if(sck=="bedroom"){
    bedroom();
  }else if(sck=="hungry"){
  fill("black");
  if(tri!=null){
    background(46,139,87);
    image(tb,45,100,500,20);
    image(tb,45,200,500,20);
    dog.visible=true;
    dog.scale=0.3;
    bow.visible=true;
    b1.show();
    b2.show();
    tri.van(true);
  }
  if((mouseOver(ch))&&foods!=0&&c==0&&sck=="hungry"){
      cursor('pointer');
  }else{cursor('default');}
  if(foods!==undefined){
    if(t==0){tri=new Food(foods);t=1;}
    if(c==0){
      dog.x=450;bow.x=150;
      if(cur<=ltfed){
      dog.addImage(dg);
    }else{dog.addImage(sdg);}
      if(foods!=0){
        textSize(25);
        fill("orange");
        text("click to feed "+gn,350,275);
        if(mousePressedOver(dog)&&dog.visible==true){
          feeddog();
        }
    }else{
      textSize(25);fill("orange");
      text("No food!",250,250);}
    if(keyDown("g")){gt();}
    }
  }
  if(ltfed!==undefined){
    fill("blue");
    var k,d;
    if(ltfed>12&&ltfed<=23){k=ltfed%12;d="pm";}
    else if(ltfed==12){k=12;d="pm";}
    else if(ltfed==0){k=12;d="am";}
    else{k=ltfed;d="am";}
    textSize(25);
    text("last fed: "+k+d,230,550);
  }
  if(c==1&&dog.x!=455){   
    if(kit!=null){    
      kit.x+=Math.round((90-kit.x)/10);kit.y+=Math.round((415-kit.y)/10);
      if((kit.x==95||kit.x==86)&&kit.y==411){
        if(kit.rotation<=120){
          kit.rotation+=15;
        }else{s2+=1;}
      }
      if((s2-s1)>=19){kit.destroy();kit=null;s2=0;}
    }else{
      bow.x+=Math.round((352-bow.x)/10);
      if(bow.x==348){
        dog.addImage(hdg);
        s3+=1;
      }
      if((s3-s4)>=19){dog.x=455;}
      }
    }
  if(dog.x==455){
    bow.x+=Math.round((145-bow.x)/10);
    if(bow.x==150){
      c=0;s3=0;
    }
  }
}
  }else{t2++;}
  drawSprites();
}

  {
function writeStockTime(x,h){
  t=1;
  if(x>0){x--;
  }else{x=0;}
  database.ref('/').update({
    food:x,
    feedTime:h
  }) 
  return x;
}

function mouseOver(x){
  if((mouseX>=x.x-x.width/2&&mouseX<=x.x+x.width/2)&&(mouseY>=x.y-x.height/2&&mouseY<=x.y+x.height/2)){
    return true;
  }else{return false;}
}

function feeddog(){
  if(foods!=0&&c==0){
  time = hour();
  kit=tri.updateFoodStock(writeStockTime(foods,time));
  s1=1;
  c=1;
 }
}

function gt(){
  if(foods>=0&&foods<=19){
    foods++;
    tri.getFood();
   database.ref('/').update({
      food:foods
    })
  }
}

function cng(){
  gn=nm.value();
  database.ref('/').update({
    name:gn
  }) 
}
  }
