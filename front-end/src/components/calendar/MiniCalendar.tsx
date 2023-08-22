import { useState, MouseEvent } from "react";
import Calendar from "react-calendar";
import Card from "components/card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";

const MiniCalendar = () => {
  const [value, setValue] = useState(new Date());
  const handleChangeDate = (newValue: any, event: MouseEvent<HTMLButtonElement>) => {
    console.log(newValue);
    console.log(event);
    setValue(newValue);
  }

  return (
    <div>
      <Card extra="flex w-full h-full flex-col px-3 py-3">
        <Calendar
          onChange={handleChangeDate}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
          view={"month"}
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
