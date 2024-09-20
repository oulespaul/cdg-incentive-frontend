import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineHeader,
    TimelineIcon,
    TimelineItem,
    TimelineTitle,
} from '.';

export const timelineData = [
    {
        id: 1,
        title: 'First event',
        date: '2022-01-01',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate odio ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris.',
    },
];

export type TimelineData = (typeof timelineData)[number];

export interface TimelineElement {
    id: number;
    title: string;
    date: string;
    description: string;
}

interface TimelineLayoutProps {
    items: TimelineElement[];
}
export const TimelineLayout = ({ items }: TimelineLayoutProps) => {
    return (
        <Timeline>
            {items.map(item => (
                <TimelineItem key={item.id}>
                    <TimelineConnector />
                    <TimelineHeader>
                        <TimelineIcon />
                        <TimelineTitle>{item.title}</TimelineTitle>
                    </TimelineHeader>
                    <TimelineContent>
                        <TimelineDescription>{item.date}</TimelineDescription>
                        <TimelineDescription>{item.description}</TimelineDescription>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};
