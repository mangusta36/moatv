export type PlanDuration = "1-month" | "3-month" | "6-month" | "12-month";

export type BasePlan = {
  id: PlanDuration;
  label: string;
  months: number;
  description: string;
  pricesByDevice: Record<DeviceCount, number>;
  note: string;
};

export type DeviceCount = 1 | 2 | 3 | 4 | 5;

export const deviceCounts = [1, 2, 3, 4, 5] as const satisfies readonly DeviceCount[];

export const pricingConfig = {
  currency: "USD",
  maxDevices: 5,
  deviceCounts,
  plans: [
    {
      id: "1-month",
      label: "1 Month",
      months: 1,
      description: "Flexible short-term moatv access for individual screens.",
      note: "Flexible monthly moatv access",
      pricesByDevice: {
        1: 27,
        2: 49,
        3: 73,
        4: 97,
        5: 122,
      },
    },
    {
      id: "3-month",
      label: "3 Months",
      months: 3,
      description: "A flexible moatv option for regular seasonal viewing.",
      note: "Good for seasonal moatv viewing",
      pricesByDevice: {
        1: 37,
        2: 67,
        3: 100,
        4: 133,
        5: 167,
      },
    },
    {
      id: "6-month",
      label: "6 Months",
      months: 6,
      description: "A longer moatv plan for stable household streaming.",
      note: "Balanced moatv duration",
      pricesByDevice: {
        1: 47,
        2: 85,
        3: 127,
        4: 169,
        5: 212,
      },
    },
    {
      id: "12-month",
      label: "12 Months",
      months: 12,
      description: "Annual moatv access for households that know their setup.",
      note: "Longest moatv duration · Best Value",
      pricesByDevice: {
        1: 67,
        2: 121,
        3: 181,
        4: 241,
        5: 302,
      },
    },
  ] satisfies BasePlan[],
} as const;
