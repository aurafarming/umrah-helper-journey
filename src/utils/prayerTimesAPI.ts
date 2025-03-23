
import { toast } from "@/components/ui/use-toast";

interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
      Firstthird: string;
      Lastthird: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
          days: number;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
        holidays: string[];
        adjustedHolidays: string[];
        method: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: {
          Fajr: number;
          Isha: string;
        };
        location: {
          latitude: number;
          longitude: number;
        };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: {
        Imsak: number;
        Fajr: number;
        Sunrise: number;
        Dhuhr: number;
        Asr: number;
        Maghrib: number;
        Sunset: number;
        Isha: number;
        Midnight: number;
      };
    };
  };
}

export type PrayerTime = {
  name: string;
  time: string;
  arabicName?: string;
  isNext?: boolean;
  timeRemaining?: string;
  color?: string;
};

export const fetchPrayerTimes = async (
  latitude: number,
  longitude: number,
  date: string = getCurrentDate(),
  method: number = 4 // Default to Umm Al-Qura University, Makkah
): Promise<PrayerTime[]> => {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prayer times");
    }

    const data: PrayerTimesResponse = await response.json();
    
    // Extract just the prayer times we need
    const prayerTimes = [
      { name: "Fajr", time: data.data.timings.Fajr, arabicName: "الفجر", color: "bg-blue-100" },
      { name: "Sunrise", time: data.data.timings.Sunrise, arabicName: "الشروق", color: "bg-orange-100" },
      { name: "Dhuhr", time: data.data.timings.Dhuhr, arabicName: "الظهر", color: "bg-yellow-100" },
      { name: "Asr", time: data.data.timings.Asr, arabicName: "العصر", color: "bg-green-100" },
      { name: "Maghrib", time: data.data.timings.Maghrib, arabicName: "المغرب", color: "bg-red-100" },
      { name: "Isha", time: data.data.timings.Isha, arabicName: "العشاء", color: "bg-indigo-100" },
    ];

    // Calculate the next prayer time
    return calculateNextPrayer(prayerTimes);
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    toast({
      title: "Error",
      description: "Failed to fetch prayer times. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
};

// Helper function to get the current date in DD-MM-YYYY format
const getCurrentDate = (): string => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  
  return `${day}-${month}-${year}`;
};

// Calculate which prayer is next
const calculateNextPrayer = (prayerTimes: PrayerTime[]): PrayerTime[] => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Convert current time to minutes since midnight
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  
  // Find the next prayer
  let nextPrayerIndex = -1;
  
  for (let i = 0; i < prayerTimes.length; i++) {
    const prayerTimeParts = prayerTimes[i].time.split(":");
    const prayerHour = parseInt(prayerTimeParts[0], 10);
    const prayerMinute = parseInt(prayerTimeParts[1], 10);
    const prayerTimeInMinutes = prayerHour * 60 + prayerMinute;
    
    if (prayerTimeInMinutes > currentTimeInMinutes) {
      nextPrayerIndex = i;
      break;
    }
  }
  
  // If no next prayer found today, the next prayer is Fajr tomorrow
  if (nextPrayerIndex === -1) {
    nextPrayerIndex = 0;
  }
  
  // Calculate time remaining for the next prayer
  const nextPrayerTimeParts = prayerTimes[nextPrayerIndex].time.split(":");
  const nextPrayerHour = parseInt(nextPrayerTimeParts[0], 10);
  const nextPrayerMinute = parseInt(nextPrayerTimeParts[1], 10);
  const nextPrayerTimeInMinutes = nextPrayerHour * 60 + nextPrayerMinute;
  
  let timeRemainingInMinutes = nextPrayerTimeInMinutes - currentTimeInMinutes;
  
  // If the next prayer is tomorrow (Fajr)
  if (timeRemainingInMinutes < 0) {
    timeRemainingInMinutes += 24 * 60; // Add 24 hours
  }
  
  const hoursRemaining = Math.floor(timeRemainingInMinutes / 60);
  const minutesRemaining = timeRemainingInMinutes % 60;
  
  const timeRemaining = `${hoursRemaining}h ${minutesRemaining}m`;
  
  // Update the next prayer in the array
  prayerTimes[nextPrayerIndex] = {
    ...prayerTimes[nextPrayerIndex],
    isNext: true,
    timeRemaining,
  };
  
  return prayerTimes;
};
