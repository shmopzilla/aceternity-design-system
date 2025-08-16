export interface ComponentMapping {
  figmaType: string;
  aceternityComponent?: string;
  props?: Record<string, unknown>;
  className?: string;
  children?: ComponentMapping[];
}

export const FIGMA_TO_ACETERNITY_MAP: Record<string, ComponentMapping> = {
  'FRAME': {
    figmaType: 'FRAME',
    aceternityComponent: 'div',
    className: 'flex flex-col'
  },
  'GROUP': {
    figmaType: 'GROUP',
    aceternityComponent: 'div',
    className: 'relative'
  },
  'RECTANGLE': {
    figmaType: 'RECTANGLE',
    aceternityComponent: 'div',
    className: 'rounded'
  },
  'TEXT': {
    figmaType: 'TEXT',
    aceternityComponent: 'p',
    className: 'text-foreground'
  },
  'ELLIPSE': {
    figmaType: 'ELLIPSE',
    aceternityComponent: 'div',
    className: 'rounded-full'
  },
  'VECTOR': {
    figmaType: 'VECTOR',
    aceternityComponent: 'svg',
    className: 'inline-block'
  },
  'COMPONENT': {
    figmaType: 'COMPONENT',
    aceternityComponent: 'div',
    className: 'component'
  },
  'INSTANCE': {
    figmaType: 'INSTANCE',
    aceternityComponent: 'div',
    className: 'component-instance'
  }
};

export const ACETERNITY_UI_COMPONENTS = {
  animations: [
    'aurora',
    'background-beams',
    'background-gradient',
    'floating-navbar',
    'infinite-moving-cards',
    'lamp',
    'meteors',
    'sparkles',
    'spotlight',
    'text-generate-effect',
    'typewriter-effect',
    'wavy-background'
  ],
  layout: [
    'bento-grid',
    'layout-grid',
    'parallax-scroll',
    'sidebar',
    'tabs'
  ],
  cards: [
    '3d-card-effect',
    'card-hover-effect',
    'card-stack',
    'expandable-card',
    'focus-cards',
    'glare-card'
  ],
  buttons: [
    'animated-modal',
    'moving-border',
    'shimmer-button',
    'tailwindcss-buttons'
  ],
  modals: [
    'animated-modal',
    'search-modal'
  ],
  loaders: [
    'loading-spinner',
    'search-loading-spinner'
  ],
  forms: [
    'floating-label-input',
    'input',
    'label',
    'label-input-container'
  ],
  navigation: [
    'floating-navbar',
    'navbar-menu'
  ]
};

export function getRecommendedAceternityComponent(figmaNodeName: string, figmaNodeType: string): string {
  const lowerName = figmaNodeName.toLowerCase();
  
  if (lowerName.includes('button')) {
    return 'shimmer-button';
  }
  
  if (lowerName.includes('card')) {
    return '3d-card-effect';
  }
  
  if (lowerName.includes('nav') || lowerName.includes('menu')) {
    return 'floating-navbar';
  }
  
  if (lowerName.includes('input') || lowerName.includes('form')) {
    return 'floating-label-input';
  }
  
  if (lowerName.includes('search') || lowerName.includes('modal')) {
    return 'search-modal';
  }
  
  if (lowerName.includes('background') || lowerName.includes('hero')) {
    return 'aurora';
  }
  
  if (lowerName.includes('grid') || lowerName.includes('layout')) {
    return 'bento-grid';
  }
  
  if (lowerName.includes('text') && (lowerName.includes('animate') || lowerName.includes('effect'))) {
    return 'text-generate-effect';
  }
  
  const mapping = FIGMA_TO_ACETERNITY_MAP[figmaNodeType];
  return mapping?.aceternityComponent || 'div';
}