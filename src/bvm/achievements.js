import { EventBus } from '../renderer/main.js'
// Initialize all achievements - Check to see if in storage
// This will initialize our big json file of achievements and place it in local storage
export const initAchievements = () => {
  if (!localStorage.getItem('achievements')) {
    const achievements = require('./achievements.json')
    localStorage.setItem('achievements', JSON.stringify(achievements))
  }
}

export const updateAchievements = (instructions, isError) => {
  if (!isError) {
    let achievementsJustUnlocked = []
    instructions.forEach(element => {
      let inst = element.split(' ')[0]
      updateCount(inst)
      checkAchievement(element, achievementsJustUnlocked)
    })
    if (achievementsJustUnlocked.length > 0) {
      EventBus.$emit('unlockAchievement', achievementsJustUnlocked)
    }
  } else {
    console.log('Error encountered')
  }
}

const updateCount = inst => {
  let value = localStorage.getItem(inst)
  if (value) {
    localStorage.setItem(inst, parseInt(value) + 1)
  } else {
    localStorage.setItem(inst, 1)
  }
}

const checkCount = inst => {
  return localStorage.getItem(inst) ? parseInt(localStorage.getItem(inst)) : 0
}

const unlockAchievement = (achievement, achievementsJustUnlocked) => {
  let achievements = JSON.parse(localStorage.getItem('achievements'))
  if (achievements[achievement].locked) {
    achievements[achievement].locked = false
    localStorage.setItem('achievements', JSON.stringify(achievements))
    achievementsJustUnlocked.push(achievement)
  }
}

const checkAchievement = (inst, achievementsJustUnlocked) => {
  // quickMAFS
  if (inst.includes('add 2 2')) {
    unlockAchievement('quickMAFS', achievementsJustUnlocked)
  }
  // Declare 1000 Variables
  if (checkCount('var') >= 1000) {
    unlockAchievement('Variable King', achievementsJustUnlocked)
  }
}
