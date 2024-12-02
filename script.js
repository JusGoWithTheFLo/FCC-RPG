//---------------------
//-----GLOBAL VARIABLES
//---------------------
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//---------------------
//-----HTML SELECTORS
//---------------------
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//---------------------
//-----OBJECTS
//---------------------
    //-----WEAPONS
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
    //-----MONSTERS
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
    //-----LOCATIONS
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

//---------------------
//-----INITIALIZE BUTTONS
//---------------------
//--default; after page loads, what buttons do when clicked
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//---------------------
//-----UPDATE FUNCTION
//---------------------
//--hides monster stats bar
//--changes button text and onclick
//--changes text to display text of location
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

//-----GO TOWN
//--function that passes 'town' object into update function
function goTown() {
  update(locations[0]);
}

//-----GO STORE
//--function that passes 'store' object into update function
function goStore() {
  update(locations[1]);
}

//-----GO CAVE
//--function that passes 'cave' object into update function
function goCave() {
  update(locations[2]);
}

//---------------------
//-----STORE FUNCTIONS
//---------------------
    //--BUY HEALTH
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You healed 10 health points!";
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

    //--BUY WEAPON
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory.join(", ");
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

        //--SELL WEAPON
        //--allows player to sell weapon AFTER player has 
        //already obtained most powerful weapon
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}
//---------------------
//-----FIGHTING FUNCTIONS
//---------------------
//--functions are called from cave or fighting dragon
    //--SLIME
    //--sets fighting value to be referenced in goFight function to 
    //call appropriate monster
    //--calls goFight function to summon monster
function fightSlime() {
  fighting = 0;
  goFight();
}
    //--BEAST
    //--sets fighting value to be referenced in goFight function to 
    //call appropriate monster
    //--calls goFight function to summon monster
function fightBeast() {
  fighting = 1;
  goFight();
}
    //--DRAGON**
    //**this function is called from TOWN location
    //--sets fighting value to be referenced in goFight function to 
    //call appropriate monster
    //--calls goFight function to summon monster
function fightDragon() {
  fighting = 2;
  goFight();
}

//-----GO FIGHT
//--called when fighting any monster
//--references fighting value from function that called this goFight function
//--displays monsterStats bar
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

//-----ATTACK ACTION
//--called when player clicks on 'attack' button in cave location
//--defines damage variables for damage dealt and damage received
//--references fighting value from function that called goFight function
function attack() {
  let playerDamage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  let monsterDamage = getMonsterAttackValue(monsters[fighting].level);
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You lose " + monsterDamage + " health!\n";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= monsterDamage;
  //--randomizes damage dealt to monster; decreases monster's health
  if (isMonsterHit()) {
    monsterHealth -= playerDamage;
    text.innerText += " You dealt " + playerDamage + " damage!";
  } else {
    //--displays 'miss' text if player misses
    text.innerText += " You miss.";
  }
    //--updates health value and text
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  //--checks if PLAYER health is equal to or less than 0
  if (health <= 0) {
    lose();
    //--checks if MONSTER health is equal to or less than 0
  } else if (monsterHealth <= 0) {
    //--checks if fighitng DRAGON (current boss monster)
    //--if defeated boss, calls winGame function
    //--else, calls defeatMonster function and resumes game
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  //--WEAPON BREAKS
  //--checks if randomly generated number is less than [chance of weapon breaking] &&
  //checks to make sure current weapon isn't the last weapon in PLAYERS inventory;
  //don't wanna break the PLAYERS last weapon lol
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += "\nYour " + inventory.pop() + " breaks!";
    currentWeapon--;
  }
}

//-----MONSTER ATK
//--randomly generated monster's ATK value based on monster level and player XP
//--returns hit value; how much damage the MONSTER did to the PLAYER
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

//-----PLAYER HITS MONSTER
//--checks if randomly generated number is above PLAYER'S chance of hitting MONSTER
//OR if PLAYERS health is below 20. looks like if PLAYER'S health is below 20, then
//the PLAYER will 100% hit the MONSTER
//--potential to update feature
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

//-----DODGE ACTION
//--just displays text saying PLAYER dodged attack
//--potential to update feature
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

//-----PLAYER DEFEATS MONSTER
//--defines gold and xp earned variables to be used in text
//--adds gold and xp based on monster's level
//--passes 'kill monster' object into update function
function defeatMonster() {
  let goldEarned = Math.floor(monsters[fighting].level * 6.7);
  let xpEarned = monsters[fighting].level;
  gold += goldEarned;
  xp += xpEarned;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  text.innerText += "\nXP Earned: " + xpEarned;
  text.innerText += "\nGold Earned: " + goldEarned;
}

//-----PLAYER LOSES LOL
function lose() {
  update(locations[5]);
}

//-----PLAYER WINS GAME!!!!
function winGame() {
  update(locations[6]);
}

//-----GAME RESTART
//--resets PLAYER xp, health, gold, and currentWeapon
//--restarts PLAYER in Town
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

//---------------------
//-----EASTER EGG FUNCTIONS
//---------------------
//--game where PLAYERS can pick between two numbers; PLAYERS pick/guess is passed
//into pick function which generates random numbers. if PLAYERS' pick/guess is
//among the randomly generated numbers, then the PLAYER is rewarded; if not,
//PLAYER is punished
//--potential to update feature
function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}