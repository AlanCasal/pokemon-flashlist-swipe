import Bug from '@assets/icons/types/bug.svg';
import Dark from '@assets/icons/types/dark.svg';
import Dragon from '@assets/icons/types/dragon.svg';
import Electric from '@assets/icons/types/electric.svg';
import Fairy from '@assets/icons/types/fairy.svg';
import Fighting from '@assets/icons/types/fighting.svg';
import Fire from '@assets/icons/types/fire.svg';
import Flying from '@assets/icons/types/flying.svg';
import Ghost from '@assets/icons/types/ghost.svg';
import Grass from '@assets/icons/types/grass.svg';
import Ground from '@assets/icons/types/ground.svg';
import Ice from '@assets/icons/types/ice.svg';
import Normal from '@assets/icons/types/normal.svg';
import Poison from '@assets/icons/types/poison.svg';
import Psychic from '@assets/icons/types/psychic.svg';
import Rock from '@assets/icons/types/rock.svg';
import Steel from '@assets/icons/types/steel.svg';
import Water from '@assets/icons/types/water.svg';

export const typeIcons = {
	bug: Bug,
	dark: Dark,
	dragon: Dragon,
	electric: Electric,
	fairy: Fairy,
	fighting: Fighting,
	fire: Fire,
	flying: Flying,
	ghost: Ghost,
	grass: Grass,
	ground: Ground,
	ice: Ice,
	normal: Normal,
	poison: Poison,
	psychic: Psychic,
	rock: Rock,
	steel: Steel,
	water: Water,
} as const;

export type PokemonIconType = keyof typeof typeIcons;
