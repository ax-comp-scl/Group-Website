import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function CalendarComponent() {
  return (
    <Calendar
      aria-label="Date (Max Date Value)"
      showMonthAndYearPickers
      maxValue={today(getLocalTimeZone())}
    />
  );
}
