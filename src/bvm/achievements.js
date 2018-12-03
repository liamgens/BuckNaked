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
    let instructionsUsed = []

    instructions.forEach(element => {
      let inst = element.split(' ')[0]
      countSwears(element)
      updateCount(inst)
      checkAchievement(element, achievementsJustUnlocked)
      instructionsUsed.push(inst)
    })

    instructionsUsed = new Set(instructionsUsed)

    if (instructionsUsed.size >= 5) {
      unlockAchievement('Buck Naked Explorer', achievementsJustUnlocked)
    }

    if (achievementsJustUnlocked.length > 0) {
      EventBus.$emit('unlockAchievement', achievementsJustUnlocked)
    }
  } else {
    console.log('Error encountered')
  }
}

const countSwears = inst => {
  let swears = [
    'fuck',
    'shit',
    'dick',
    'ass',
    'whore',
    'pussy',
    'bitch',
    'cunt',
    'tits'
  ]
  let instAsLowercase = inst.toLowerCase()

  if (swears.some(el => instAsLowercase.includes(el))) {
    updateCount('swears')
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
  unlockAchievement('Smash', achievementsJustUnlocked)

  if (inst.includes('add 2 2')) {
    unlockAchievement('quickMAFS', achievementsJustUnlocked)
  }
  if (checkCount('var') >= 100) {
    unlockAchievement('Variable King', achievementsJustUnlocked)
  }
  if (checkCount('add') >= 100) {
    unlockAchievement('Preschool', achievementsJustUnlocked)
  }
  if (checkCount('sub') >= 100) {
    unlockAchievement('Elementary School', achievementsJustUnlocked)
  }
  if (checkCount('mul') >= 100) {
    unlockAchievement('Middle School', achievementsJustUnlocked)
  }
  if (checkCount('div') >= 100) {
    unlockAchievement('High School', achievementsJustUnlocked)
  }
  if (checkCount('swears') >= 3) {
    unlockAchievement(
      'You kiss your mother with that mouth?',
      achievementsJustUnlocked
    )
  }
}
