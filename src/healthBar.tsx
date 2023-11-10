import OBR, { AttachmentBehavior, Image, Item, buildShape, isImage } from "@owlbear-rodeo/sdk";

const ID = "com.mytracker.initiative";

export const drawHealthBar = async (item: Image) => {
    
  const metadata: any = item.metadata[`${ID}/metadata`];

  //try to extract temporary health metadata
  let tempHealth: number;
  try {
      tempHealth = parseFloat(metadata.hpTemp);
  } catch (error) {
      tempHealth = 0;
  }
  if(isNaN(tempHealth)) {
      tempHealth = 0;
  }

  //try to extract health from metadata
  var health: number;
  var maxHealth: number;
  var shield: number;
  try {
      health = parseFloat(metadata.hp);
      maxHealth = parseFloat(metadata.hpMax);
      shield = parseFloat(metadata.hpTemp);
  } catch (error) {
      health = 0;
      maxHealth = 0;
      shield = 0
  }
  if(isNaN(health)) {
      health = 0;
  }
  if(isNaN(maxHealth)) {
      maxHealth = 0;
  }
  if(isNaN(shield)) {
    shield = 0;
  }

  //try to extract visibility from metadata
  const visible = true;
  
  if (visible) { //draw bar if it has max health and is visible

      //get physical token properties
      const dpi = await OBR.scene.grid.getDpi();
      const bounds = getImageBounds(item, dpi);
      bounds.width = Math.abs(bounds.width);
      bounds.height = Math.abs(bounds.height);
      let disableAttachmentBehavior: AttachmentBehavior[] = ["ROTATION", "VISIBLE", "COPY", "SCALE"];

      //set color based on visibility
      var healthBackgroundColor = "darkgrey";
      let setVisibilityProperty = item.visible;
      let backgroundOpacity = 0.6;
      let healthOpacity = 0.5;
      if (!visible) {
          healthBackgroundColor = "black";
          // setVisibilityProperty = true;
          // backgroundOpacity = 0.7;
          // healthOpacity = 0.5;
      }

      const barHeight = 10;

      let bottomMultiplier: number = 1;
      let origin = {
          x: item.position.x,
          y: item.position.y + bottomMultiplier * bounds.height / 2,
      }

      if (maxHealth > 0) {

          const barPadding = 2;
          // if (drewArmorClass && drewTempHealth) {
          //     spaceForCircles = 4 + diameter * 2;
          // } else if (drewArmorClass || drewTempHealth) {
          //     spaceForCircles = 2 + diameter;
          // }
          const position = {
              x: origin.x - bounds.width / 2 + barPadding,
              y: origin.y - barHeight - 2,
          };
          const barWidth = bounds.width - barPadding * 2;

          const backgroundShape = buildShape()
          .width(barWidth)
          .height(barHeight)
          .shapeType("RECTANGLE")
          .fillColor(healthBackgroundColor)
          .fillOpacity(backgroundOpacity)
          .strokeWidth(0)
          .position({x: position.x, y: position.y})
          .attachedTo(item.id)
          .layer("ATTACHMENT")
          .locked(true)
          .id(item.id + "health-background")
          .visible(setVisibilityProperty)
          .disableAttachmentBehavior(disableAttachmentBehavior)
          .build();
          
          var healthPercentage = 0;
          if (health <= 0) {
              healthPercentage = 0;
          } else if (health < maxHealth) {
              healthPercentage = health / maxHealth;
          } else if (health >= maxHealth){
              healthPercentage = 1;
          } else {
              healthPercentage = 0;
          }
      
          const healthShape = buildShape()
          .width(healthPercentage === 0 ? 0 : (barWidth) * healthPercentage)
          .height(barHeight)
          .shapeType("RECTANGLE")
          .fillColor("red")
          .fillOpacity(healthOpacity)
          .strokeWidth(0)
          .strokeOpacity(0)
          .position({ x: position.x, y: position.y})
          .attachedTo(item.id)
          .layer("ATTACHMENT")
          .locked(true)
          .id(item.id + "health")
          .visible(setVisibilityProperty)
          .disableAttachmentBehavior(disableAttachmentBehavior)
          .build();

          var shieldPercentage = 0;
          if (shield <= 0) {
            shieldPercentage = 0;
          } else if (shield < maxHealth) {
            shieldPercentage = shield / maxHealth;
          } else if (shield >= maxHealth){
            shieldPercentage = 1;
          } else {
            shieldPercentage = 0;
          }
      
          const shieldShape = buildShape()
          .width(shieldPercentage === 0 ? 0 : (barWidth) * shieldPercentage)
          .height(barHeight)
          .shapeType("RECTANGLE")
          .fillColor("blue")
          .fillOpacity(healthOpacity)
          .strokeWidth(0)
          .strokeOpacity(0)
          .position({ x: position.x, y: position.y + barHeight})
          .attachedTo(item.id)
          .layer("ATTACHMENT")
          .locked(true)
          .id(item.id + "shield")
          .visible(setVisibilityProperty)
          .disableAttachmentBehavior(disableAttachmentBehavior)
          .build();

          /*const healthText = buildText()
          .position({x: position.x, y: position.y + textVerticalOffset})
          .plainText("" + health + String.fromCharCode(0x2215) + maxHealth)
          .textAlign("CENTER")
          .textAlignVertical("MIDDLE")
          .fontSize(barFontSize)
          .fontFamily(font)
          .textType("PLAIN")
          .height(barTextHeight)
          .width(barWidth)
          .fontWeight(400)
          //.strokeColor("black")
          //.strokeWidth(0)
          .attachedTo(item.id)
          .fillOpacity(1)
          .layer("TEXT")
          .locked(true)
          .id(item.id + "health-label")
          .visible(setVisibilityProperty)
          .disableAttachmentBehavior(disableAttachmentBehavior)
          .build();*/
          
          OBR.scene.local.addItems([backgroundShape, healthShape, shieldShape, /*healthText*/]); //bulk add items 
          //add health bar to add array
      } else { // delete health bar
          OBR.scene.local.deleteItems([item.id + "health-background", item.id + "health", item.id + "health-label", item.id + "shield"])
      }
  } else { // delete health bar
    OBR.scene.local.deleteItems([item.id + "health-background", item.id + "health", item.id + "health-label", item.id + "shield"])
  }
  return[];
}

const getImageBounds = (item: Image, dpi: number) => {
  const dpiScale = dpi / item.grid.dpi;
  const width = item.image.width * dpiScale * item.scale.x;
  const height = item.image.height * dpiScale * item.scale.y;
  return { width, height };
};

export const refreshBar = (items: Item[]) => {
  for(const item of items) {
    if(item.layer === "CHARACTER" && isImage(item)) {
      drawHealthBar(item);
    }
  }
}