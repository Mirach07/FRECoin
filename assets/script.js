"use strict";

let score = 1900;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let energy = 500;
let maxEnergy = 500;

let clickMultiplierUpgradeCost = 50;
let pointsPerSecondUpgradeCost = 100;
let maxEnergyUpgradeCost = 100;

let ksisSkinCost = 1000;
let isKsisSkinOwned = false;
let iefSkinCost = 1000;
let isIefSkinOwned = false;

let clickerImage = document.getElementById("clicker__image");
let scoreCounter = document.getElementById("scoreCounter");

let ksisSkinBuyButton = document.getElementById("buy__buttonKsis");
let freSkinBuyButton = document.getElementById("buy__buttonFre");
let iefSkinBuyButton = document.getElementById("buy__buttonIef");

const clickMultiplierLevel = document.getElementById("clickMultiplier");
const autoClickerLevel = document.getElementById("pointsPerSecond");
const maxEnergyLevel = document.getElementById("maxEnergy");

const upgrades__clickMultiplier = document.getElementById("upgrades__clickMultiplier");
const upgrades__autoClicker = document.getElementById("upgrades__autoClicker");
const upgrades__maxEnergy = document.getElementById("upgrades__energy");

const upgradeAutoClickerLevel = document.getElementById("pointsPerSecond__upgrade");
const upgradeClickMultiplierLevel = document.getElementById("clickMultiplier__upgrade");

const skinsFre = document.getElementById("skins__fre");
const skinsKsis = document.getElementById("skins__ksis");
const skinsIef = document.getElementById("skins__ief");



clickerImage.onmousedown = () => {
    enlargeImage();
};

clickerImage.onmouseup = () => {
    if(energy >= pointsPerClick) {
        score += pointsPerClick;
        scoreCounter.innerHTML = (score);

        energy -= pointsPerClick;
        updateEnergy();
    }

    resetImageSize();
    checkAbilityToUpgrade();
};



setInterval(autoClicker, 1000);
setInterval(energyGain, 1000);



upgrades__clickMultiplier.onclick = () => {
    if(clickMultiplierUpgradeCost <= score){
        pointsPerClick++;

        score -= clickMultiplierUpgradeCost;
        updateScore();

        clickMultiplierUpgradeCost *= 1.5;
        clickMultiplierUpgradeCost = Math.trunc(clickMultiplierUpgradeCost);

        clickMultiplierLevel.innerHTML = (pointsPerClick);

        document.getElementById("clickMultiplierUpgradeCost").innerHTML = (Math.trunc(clickMultiplierUpgradeCost));
        checkAbilityToUpgrade();

    } else{
        alert("А хомяк потапыч?");
    }
};

upgrades__autoClicker.onclick = () => {
    if(pointsPerSecondUpgradeCost <= score){
        pointsPerSecond++;

        score -= pointsPerSecondUpgradeCost;
        updateScore();

        pointsPerSecondUpgradeCost *= 1.5;
        pointsPerSecondUpgradeCost = Math.trunc(pointsPerSecondUpgradeCost);

        autoClickerLevel.innerHTML = (pointsPerSecond   );

        document.getElementById("pointsPerSecondUpgradeCost").innerHTML = (Math.trunc(pointsPerSecondUpgradeCost));

        checkAbilityToUpgrade();
    
    } else{
        alert("А хомяк потапыч?");
    }
};

upgrades__maxEnergy.onclick = () => {
    if(maxEnergyUpgradeCost <= score){
        maxEnergy *= 2;

        score -= maxEnergyUpgradeCost;
        updateScore();

        maxEnergyUpgradeCost *= 1.5;
        maxEnergyUpgradeCost = Math.trunc(maxEnergyUpgradeCost);

        maxEnergyLevel.innerHTML = (maxEnergy);

        document.getElementById("maxEnergyUpgradeCost").innerHTML = (Math.trunc(maxEnergyUpgradeCost));

        checkAbilityToUpgrade();
    
    } else{
        alert("А хомяк потапыч?");
    }
};

skinsFre.onclick = () => {
    if(clickerImage.src !== "C:\FRVscodeThings\ФРЭCoin\assets\images\ФРЭ.PNG") {
        changeSkinFre();
    }
}

skinsKsis.onclick = () => {
    if(isKsisSkinOwned == true){
        if(clickerImage.src == "C:\FRVscodeThings\ФРЭCoin\assets\images\ksis.png")
            alert("You already using КСИС");
        else
            changeSkinKsis()
    } else if(ksisSkinCost > 0 && ksisSkinCost <= score){
        isKsisSkinOwned = true;

        changeSkinKsis();
        score -= ksisSkinCost;
        updateScore();

        ksisSkinCost = -100;
    } else{
        alert("You can't escape ФРЭ");
    }
}

skinsIef.onclick = () => {
    if(isIefSkinOwned == true){
        if(clickerImage.src == "C:\FRVscodeThings\ФРЭCoin\assets\images\ief.png")
            alert("You already using ИЭФ");
        else
            changeSkinIef()
    } else if(iefSkinCost > 0 && iefSkinCost <= score){
        isIefSkinOwned = true;

        changeSkinIef();
        score -= iefSkinCost;
        updateScore();

        iefSkinCost = -100;
    } else{
        alert("You can't escape ФРЭ");
    }
}






function updateScore(){
    scoreCounter.innerHTML = (score);
}

function updateEnergy() {
    document.getElementById("energyCounter").textContent = (energy);
}

function enlargeImage(){
    clickerImage.style.transform = "scale(1.1)";
    clickerImage.style.transition = "transform 0.2s ease";
}

function resetImageSize(){
    clickerImage.style.transform = "scale(1)";
    clickerImage.style.transition = "transform 0.2s ease";
}

function autoClicker() {
    score += pointsPerSecond;
    scoreCounter.innerHTML = (score);
    checkAbilityToUpgrade();
}

function energyGain() {
    if(energy < maxEnergy)
        energy += maxEnergy / 500;
    else
        energy = maxEnergy;

    updateEnergy();
    console.log(energy);
}

function changeSkinFre() {
    clickerImage.src = "assets/images/ФРЭ.PNG";
    freSkinBuyButton.textContent = "Выбрано";

    if(isKsisSkinOwned)
        ksisSkinBuyButton.textContent = "Выбрать";

    if(isIefSkinOwned)
        iefSkinBuyButton.textContent = "Выбрать";
}

function changeSkinKsis() {
    clickerImage.src = "assets/images/ksis.png";
    ksisSkinBuyButton.textContent = "Выбрано";

    freSkinBuyButton.textContent = "Выбрать";

    if(isIefSkinOwned)
        iefSkinBuyButton.textContent = "Выбрать";
}

function changeSkinIef() {
    clickerImage.src = "assets/images/ief.png";
    iefSkinBuyButton.textContent = "Выбрано";

    freSkinBuyButton.textContent = "Выбрать";

    if(isKsisSkinOwned)
        ksisSkinBuyButton.textContent = "Выбрать";
}

function checkAbilityToUpgrade() {
    if(score >= clickMultiplierUpgradeCost){
        upgrades__clickMultiplier.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        upgrades__clickMultiplier.style.transform = "scale(1.05)";
    } else{
        upgrades__clickMultiplier.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        upgrades__clickMultiplier.style.transform = "scale(1)";
    }

    if(score >= pointsPerSecondUpgradeCost){
        upgrades__autoClicker.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        upgrades__autoClicker.style.transform = "scale(1.05)";
    } else{
        upgrades__autoClicker.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        upgrades__autoClicker.style.transform = "scale(1)";
    }

    if(score >= maxEnergyUpgradeCost){
        upgrades__maxEnergy.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        upgrades__maxEnergy.style.transform = "scale(1.05)";
    } else{
        upgrades__maxEnergy.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        upgrades__maxEnergy.style.transform = "scale(1)";
    }

    if(ksisSkinCost > 0 && score >= ksisSkinCost){
        skinsKsis.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        skinsKsis.style.transform = "scale(1.05)";
    } else{
        skinsKsis.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        skinsKsis.style.transform = "scale(1)";
    }

    if(iefSkinCost > 0 && score >= iefSkinCost){
        skinsIef.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        skinsIef.style.transform = "scale(1.05)";
    } else{
        skinsIef.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        skinsIef.style.transform = "scale(1)";
    }
}