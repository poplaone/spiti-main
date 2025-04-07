
/**
 * Utility function to generate appropriate alt text for carousel images
 */
export function getCarouselImageAlt(src: string, index: number): string {
  if (src.includes('19314897')) {
    return "Chandrataal Lake with snow-capped mountains in Spiti Valley, Himachal Pradesh";
  } else if (src.includes('9b3798e9')) {
    return "Stunning Milky Way night sky over Spiti Valley mountains";
  } else if (src.includes('84853251')) {
    return "Suspension bridge in Spiti Valley with mountains in background";
  } else if (src.includes('8edf4fb0')) {
    return "Key Monastery with snow-capped mountains in Spiti Valley";
  } else if (src.includes('fa13766a')) {
    return "Ancient monastery in snowy Spiti Valley";
  } else if (src.includes('fe95c61b')) {
    return "River valley in Spiti region";
  } else if (src.includes('5b82c4c3')) {
    return "Person overlooking the serene Chandrataal Lake surrounded by mountains in Spiti Valley";
  } else if (src.includes('adad2c0d')) {
    return "Motorcycle tour on mountain roads in Spiti";
  }
  
  return `Spiti Valley landscape - slide ${index + 1}`;
}
