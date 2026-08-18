// Measure actual diagram width requirements
// Based on current coordinates in the compressed horizontal layout:

const measurements = {
  origin: 60,
  gate1: 280,
  gate2: 560, 
  gate3: 840,
  gate4: 1110,
  finalTextStart: 1140,
  
  // Text measurements (approximate based on font sizes)
  // "EMERGENCY ESCALATION" at 16px bold = ~210px
  // "final_route: PATH_EMERGENCY_NOW" at 12px = ~250px
  emergencyText: 210,
  finalRouteText: 250,
  
  // Required right padding
  rightPadding: 24
};

const totalRequired = measurements.finalTextStart + 
                     Math.max(measurements.emergencyText, measurements.finalRouteText) + 
                     measurements.rightPadding;

console.log('=== DIAGRAM WIDTH ANALYSIS ===');
console.log(`Final text starts at: ${measurements.finalTextStart}px`);
console.log(`Widest text extends: ${Math.max(measurements.emergencyText, measurements.finalRouteText)}px`);
console.log(`Right padding needed: ${measurements.rightPadding}px`);
console.log(`\nTOTAL REQUIRED WIDTH: ${totalRequired}px`);
console.log(`\nCurrent viewBox width: 1350px`);
console.log(`Safe minimum viewport for horizontal layout: ${totalRequired + 48}px (with container padding)`);
console.log(`\nRecommended breakpoint: 1280px (use vertical below this)`);
