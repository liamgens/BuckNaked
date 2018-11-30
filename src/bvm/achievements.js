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
    instructions.forEach(element => {
      let inst = element.split(' ')[0]
      updateCount(inst)
      checkAchievement(element)
    })
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

const unlockAchievement = achievement => {
  let achievements = JSON.parse(localStorage.getItem('achievements'))
  achievements[achievement].locked = false
  localStorage.setItem('achievements', JSON.stringify(achievements))
}

const checkAchievement = inst => {
  // quickMAFS
  if (inst.includes('add 2 2')) {
    unlockAchievement('quickMAFS')
  }
  // Declare 1000 Variables
  if (checkCount('var') >= 100) {
    unlockAchievement('Variable King')
  }
}
