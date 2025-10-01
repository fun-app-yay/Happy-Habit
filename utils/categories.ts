// FIX: Created categories utility file to resolve module errors.
import { GoalCategory } from '../types';
import {
    HealthIcon,
    MindIcon,
    MoneyIcon,
    CareerIcon,
    TravelIcon,
    FriendsIcon,
    BeautyIcon,
    SelfGrowthIcon
} from '../components/icons';

interface CategoryInfo {
    name: GoalCategory;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color: string;
    bgColor: string;
}

export const categories: CategoryInfo[] = [
    { name: 'Health', Icon: HealthIcon, color: 'text-sage-green', bgColor: 'bg-sage-green' },
    { name: 'Mindfulness', Icon: MindIcon, color: 'text-dusty-rose', bgColor: 'bg-dusty-rose' },
    { name: 'Finance', Icon: MoneyIcon, color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
    { name: 'Career', Icon: CareerIcon, color: 'text-dusty-blue', bgColor: 'bg-dusty-blue' },
    { name: 'Travel', Icon: TravelIcon, color: 'text-indigo-500', bgColor: 'bg-indigo-500' },
    { name: 'Family & Friends', Icon: FriendsIcon, color: 'text-teal-500', bgColor: 'bg-teal-500' },
    { name: 'Beauty', Icon: BeautyIcon, color: 'text-red-400', bgColor: 'bg-red-400' },
    { name: 'Self-Growth', Icon: SelfGrowthIcon, color: 'text-orange-500', bgColor: 'bg-orange-500' },
];