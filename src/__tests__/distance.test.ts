import { describe, it, expect } from 'vitest';
import { calculateHaversineDistance, formatDistance } from '../utils/distance';

describe('Geospatial Haversine Distance Calculations', () => {
  it('accurately calculates known distance between Shaniwar Wada and Parvati Hill (~2.6-3.2 km)', () => {
    // Shaniwar Wada: 18.5195, 73.8553
    // Parvati Hill: 18.4965, 73.8475
    const distance = calculateHaversineDistance(18.5195, 73.8553, 18.4965, 73.8475);
    expect(distance).toBeGreaterThan(2.0);
    expect(distance).toBeLessThan(3.5);
  });

  it('calculates zero distance for identical coordinates', () => {
    const dist = calculateHaversineDistance(18.5204, 73.8567, 18.5204, 73.8567);
    expect(dist).toBe(0);
  });

  it('safely handles NaN and invalid coordinate inputs without throwing errors', () => {
    const dist = calculateHaversineDistance(NaN, 73.8567, 18.5204, NaN);
    expect(dist).toBe(0);
  });

  it('formats sub-kilometer distances in meters and greater distances in kilometers', () => {
    expect(formatDistance(0.4)).toBe('400 m');
    expect(formatDistance(3.45)).toBe('3.5 km');
    expect(formatDistance(12.8)).toBe('12.8 km');
  });
});
