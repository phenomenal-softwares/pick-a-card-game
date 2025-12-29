import { POWERUP_TYPES } from "./powerupTypes";

/**
 * Creates a powerup instance the game can use safely
 */
export function createPowerup(type, uses) {
  return {
    type,
    uses,
    active: true,
  };
}

/**
 * Checks if powerup can still be used
 */
export function canUsePowerup(powerup) {
  return powerup && powerup.active && powerup.uses > 0;
}

/**
 * Consumes one use of a powerup
 */
export function consumePowerup(powerup) {
  if (!canUsePowerup(powerup)) return powerup;

  const remainingUses = powerup.uses - 1;

  return {
    ...powerup,
    uses: remainingUses,
    active: remainingUses > 0,
  };
}

/**
 * Executes the powerup effect
 * GameScreen decides WHEN to call this.
 */
export function executePowerup({
  powerup,
  gameState,
  helpers,
}) {
  if (!canUsePowerup(powerup)) return gameState;

  switch (powerup.type) {
    case POWERUP_TYPES.PEEK:
      return {
        ...gameState,
        revealedCards: helpers.revealRandomCards(1),
      };

    case POWERUP_TYPES.DOUBLE_PEEK:
      return {
        ...gameState,
        revealedCards: helpers.revealRandomCards(2),
      };

    case POWERUP_TYPES.FREEZE_SHUFFLE:
      return {
        ...gameState,
        shuffleFrozenTurns: 2, // example
      };

    default:
      return gameState;
  }
}
