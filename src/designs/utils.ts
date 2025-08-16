import { FigmaColor, FigmaNode, DesignToken, FigmaFill } from './types';

export function figmaColorToHex(color: FigmaColor): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function figmaColorToHsl(color: FigmaColor): string {
  const r = color.r;
  const g = color.g;
  const b = color.b;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l: number = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }
  
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export function extractColorsFromNode(node: FigmaNode): DesignToken[] {
  const tokens: DesignToken[] = [];
  
  if (node.fills) {
    node.fills.forEach((fill: FigmaFill, index: number) => {
      if (fill.type === 'SOLID' && fill.color) {
        tokens.push({
          name: `${node.name.toLowerCase().replace(/\s+/g, '-')}-fill-${index}`,
          value: figmaColorToHsl(fill.color),
          type: 'color',
          category: 'fills',
          description: `Fill color from ${node.name}`
        });
      }
    });
  }
  
  if (node.strokes) {
    node.strokes.forEach((stroke, index) => {
      if (stroke.color) {
        tokens.push({
          name: `${node.name.toLowerCase().replace(/\s+/g, '-')}-stroke-${index}`,
          value: figmaColorToHsl(stroke.color),
          type: 'color',
          category: 'strokes',
          description: `Stroke color from ${node.name}`
        });
      }
    });
  }
  
  return tokens;
}

export function extractSpacingFromNode(node: FigmaNode): DesignToken[] {
  const tokens: DesignToken[] = [];
  
  if (node.absoluteBoundingBox) {
    const { width, height } = node.absoluteBoundingBox;
    
    tokens.push(
      {
        name: `${node.name.toLowerCase().replace(/\s+/g, '-')}-width`,
        value: `${width}px`,
        type: 'dimension',
        category: 'spacing',
        description: `Width of ${node.name}`
      },
      {
        name: `${node.name.toLowerCase().replace(/\s+/g, '-')}-height`,
        value: `${height}px`,
        type: 'dimension',
        category: 'spacing',
        description: `Height of ${node.name}`
      }
    );
  }
  
  return tokens;
}

export function extractTypographyFromNode(node: FigmaNode): DesignToken[] {
  const tokens: DesignToken[] = [];
  
  if (node.style) {
    const baseName = node.name.toLowerCase().replace(/\s+/g, '-');
    
    tokens.push(
      {
        name: `${baseName}-font-family`,
        value: node.style.fontFamily,
        type: 'typography',
        category: 'font-family',
        description: `Font family from ${node.name}`
      },
      {
        name: `${baseName}-font-size`,
        value: `${node.style.fontSize}px`,
        type: 'typography',
        category: 'font-size',
        description: `Font size from ${node.name}`
      },
      {
        name: `${baseName}-font-weight`,
        value: node.style.fontWeight,
        type: 'typography',
        category: 'font-weight',
        description: `Font weight from ${node.name}`
      }
    );
    
    if (node.style.lineHeightPx) {
      tokens.push({
        name: `${baseName}-line-height`,
        value: `${node.style.lineHeightPx}px`,
        type: 'typography',
        category: 'line-height',
        description: `Line height from ${node.name}`
      });
    }
    
    if (node.style.letterSpacing) {
      tokens.push({
        name: `${baseName}-letter-spacing`,
        value: `${node.style.letterSpacing}px`,
        type: 'typography',
        category: 'letter-spacing',
        description: `Letter spacing from ${node.name}`
      });
    }
  }
  
  return tokens;
}

export function nodeToDesignTokens(node: FigmaNode): DesignToken[] {
  return [
    ...extractColorsFromNode(node),
    ...extractSpacingFromNode(node),
    ...extractTypographyFromNode(node)
  ];
}

export function designTokensToCSS(tokens: DesignToken[]): string {
  let css = ':root {\n';
  
  tokens.forEach(token => {
    css += `  --${token.name}: ${token.value};\n`;
  });
  
  css += '}\n';
  
  return css;
}