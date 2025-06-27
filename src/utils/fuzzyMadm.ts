import { FuzzyNumber, FuzzyWeight, FuzzyRating, FrameworkData, MADMResult } from '../types';

export function createFuzzyNumber(low: number, mid: number, high: number): FuzzyNumber {
  return { low, mid, high };
}

export function multiplyFuzzy(a: FuzzyNumber, b: FuzzyNumber): FuzzyNumber {
  return {
    low: a.low * b.low,
    mid: a.mid * b.mid,
    high: a.high * b.high
  };
}

export function addFuzzy(a: FuzzyNumber, b: FuzzyNumber): FuzzyNumber {
  return {
    low: a.low + b.low,
    mid: a.mid + b.mid,
    high: a.high + b.high
  };
}

export function defuzzify(fuzzyNum: FuzzyNumber): number {
  // Using centroid method
  return (fuzzyNum.low + fuzzyNum.mid + fuzzyNum.high) / 3;
}

export function normalizeValue(value: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export function valueToFuzzyRating(normalizedValue: number): FuzzyNumber {
  // Convert normalized value (0-1) to fuzzy triangular number
  if (normalizedValue <= 0.2) {
    return createFuzzyNumber(0, 0, 0.3);
  } else if (normalizedValue <= 0.4) {
    return createFuzzyNumber(0.1, 0.3, 0.5);
  } else if (normalizedValue <= 0.6) {
    return createFuzzyNumber(0.3, 0.5, 0.7);
  } else if (normalizedValue <= 0.8) {
    return createFuzzyNumber(0.5, 0.7, 0.9);
  } else {
    return createFuzzyNumber(0.7, 1, 1);
  }
}

export function calculateFuzzyMADM(
  frameworks: FrameworkData[],
  weights: FuzzyWeight
): MADMResult[] {
  if (frameworks.length === 0) return [];

  // Find min/max values for normalization
  const metrics = {
    popularity: { min: Math.min(...frameworks.map(f => f.popularity)), max: Math.max(...frameworks.map(f => f.popularity)) },
    community: { min: Math.min(...frameworks.map(f => f.community)), max: Math.max(...frameworks.map(f => f.community)) },
    maintenance: { min: Math.min(...frameworks.map(f => f.maintenance)), max: Math.max(...frameworks.map(f => f.maintenance)) },
    maturity: { min: Math.min(...frameworks.map(f => f.maturity)), max: Math.max(...frameworks.map(f => f.maturity)) }
  };

  const results: MADMResult[] = frameworks.map(framework => {
    // Normalize and convert to fuzzy ratings
    const normalizedPopularity = normalizeValue(framework.popularity, metrics.popularity.min, metrics.popularity.max);
    const normalizedCommunity = normalizeValue(framework.community, metrics.community.min, metrics.community.max);
    const normalizedMaintenance = normalizeValue(framework.maintenance, metrics.maintenance.min, metrics.maintenance.max);
    const normalizedMaturity = normalizeValue(framework.maturity, metrics.maturity.min, metrics.maturity.max);

    const ratings: FuzzyRating = {
      popularity: valueToFuzzyRating(normalizedPopularity),
      community: valueToFuzzyRating(normalizedCommunity),
      maintenance: valueToFuzzyRating(normalizedMaintenance),
      maturity: valueToFuzzyRating(normalizedMaturity)
    };

    // Calculate weighted fuzzy score
    let fuzzyScore = createFuzzyNumber(0, 0, 0);

    // Add weighted contributions
    fuzzyScore = addFuzzy(fuzzyScore, multiplyFuzzy(weights.popularity, ratings.popularity));
    fuzzyScore = addFuzzy(fuzzyScore, multiplyFuzzy(weights.community, ratings.community));
    fuzzyScore = addFuzzy(fuzzyScore, multiplyFuzzy(weights.maintenance, ratings.maintenance));
    fuzzyScore = addFuzzy(fuzzyScore, multiplyFuzzy(weights.maturity, ratings.maturity));

    const score = defuzzify(fuzzyScore);

    return {
      framework,
      score,
      rank: 0, // Will be set after sorting
      fuzzyScore
    };
  });

  // Sort by score and assign ranks
  results.sort((a, b) => b.score - a.score);
  results.forEach((result, index) => {
    result.rank = index + 1;
  });

  return results;
}

export const defaultWeights: FuzzyWeight = {
  popularity: createFuzzyNumber(0.2, 0.3, 0.4),
  community: createFuzzyNumber(0.15, 0.25, 0.35),
  maintenance: createFuzzyNumber(0.25, 0.35, 0.45),
  maturity: createFuzzyNumber(0.1, 0.2, 0.3)
};