import { useMantineTheme } from "@mantine/core";
import {
    format,
    getDay,
    parse,
    startOfWeek,
    addDays,
    isSameMonth,
} from "date-fns";
import { vi } from "date-fns/locale";
import "moment-timezone";
import "moment/locale/vi";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, DateLocalizer, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    'vi-VN': vi,
}

const localizer: DateLocalizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
}) as DateLocalizer;

const events = [
    {
        title: "Họp nhóm",
        start: new Date(2025, 10, 4, 10, 0),
        end: new Date(2025, 10, 4, 11, 0),
    },
    {
        title: "Chiếu phim",
        start: new Date(2025, 10, 4, 12, 0),
        end: new Date(2025, 10, 4, 13, 0),
    },
];

const Showtime: React.FC = () => {
    const theme = useMantineTheme();
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState<View>("month");


    return (
        <div style={{ height: "100vh", padding: 20 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: "100%",
                    borderRadius: 8,
                    padding: 10,
                }}
                messages={{
                    today: "Hôm nay",
                    previous: "Trước",
                    next: "Sau",
                    month: "Tháng",
                    week: "Tuần",
                    day: "Ngày",
                    agenda: "Lịch",
                    date: "Ngày",
                    time: "Giờ",
                    event: "Sự kiện",
                    noEventsInRange: "Không có sự kiện nào trong khoảng này",
                }}
                dayPropGetter={(date) => {
                    const today = new Date();
                    if (date.toDateString() === today.toDateString()) {
                        return {
                            style: {
                                backgroundColor: theme.colors.neutrals[2],
                                color: theme.colors.white[0],
                            },
                        };
                    }
                    return {
                        style: {
                            backgroundColor: theme.colors.dark[0],
                            color: theme.colors.white[0],
                        },
                    };
                }}

                formats={{
                    timeGutterFormat: (date, culture) =>
                        localizer.format(date, 'HH:mm', culture),
                    eventTimeRangeFormat: ({ start, end }, culture,) =>
                        `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
                    weekdayFormat: (date) => {
                        const day = date.getDay();
                        return day === 0 ? "CN" : `T${day + 1}`;
                    },
                    dayFormat: (date) => {
                        const day = date.getDay();
                        return day === 0 ? "CN" : `T${day + 1}`;
                    },
                    monthHeaderFormat: (date) =>
                        `Tháng ${format(date, "M, yyyy", { locale: vi })}`,
                    dayRangeHeaderFormat: ({ start }) => {
                        const realStart = startOfWeek(start, { weekStartsOn: 1 });
                        const realEnd = addDays(realStart, 6);
                        if (isSameMonth(realStart, realEnd)) {
                            return `${format(realStart, "d", { locale: vi })}–${format(realEnd, "d", {
                                locale: vi,
                            })} Tháng ${format(realEnd, "M, yyyy", { locale: vi })}`;
                        }
                        return `${format(realStart, "d MMM", { locale: vi })} – ${format(
                            realEnd,
                            "d MMM, yyyy",
                            { locale: vi }
                        )}`;
                    },
                    dayHeaderFormat: (date) =>
                        format(date, "EEEE, d MMMM yyyy", { locale: vi }),
                }}
                components={{}}

                culture="vi"
                date={date}
                view={view}
                step={60 * 3}
                min={new Date(2025, 0, 1, 0, 0)}
                max={new Date(2025, 0, 1, 23, 59)}
                timeslots={1}
                onNavigate={(newDate) => setDate(newDate)}
                onView={(newView) => setView(newView)}
            />
        </div>
    );
};

export default Showtime;
