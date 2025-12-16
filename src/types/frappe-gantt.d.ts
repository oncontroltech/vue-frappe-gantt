declare module "frappe-gantt" {


    interface Task {
        id: string;
        name: string;
        start: string;
        end?: string;
        duration?: string;
        progress?: number;
        custom_class?: string;
    }

    interface ViewMode {
        name : string;
        padding : string;
        step : string;
        lower_text: string | ((currentDate : Date, previousDate : Date, lang) => string);
        upper_text: string | ((currentDate : Date, previousDate : Date, lang) => string);
        upper_text_frequency: number;
        thick_line: ((currentDate) => boolean);
        date_format?: string;
        column_width?: number;
        snap_at?: string;
    }

    interface PopupContext {
        task: Task;
        chart: Gantt;
        get_title: () => string;
        set_title: (title: string) => void;
        get_subtitle: () => string;
        set_subtitle: (subtitle: string) => void;
        get_details: () => string;
        set_details: (details: string) => void;
        add_action: (html: string, func: () => void) => void;
    }

    interface GanttOptions {
        arrow_curve?: number;
        auto_move_label?: boolean;
        bar_corner_radius?: number;
        bar_height?: number;
        container_height?: number | "auto";
        column_width?: number;
        date_format?: string;
        upper_header_height?: number;
        lower_header_height?: number;
        snap_at?: string;
        infinite_padding?: boolean;
        holidays?: string;
        is_weekend?: (d: Date) => boolean;
        ignore?: "weekend" | string[];
        language?: string;
        lines?: "none" | "vertical" | "horizontal" | "both";
        move_dependencies?: boolean;
        padding?: number;
        popup_on?: "click" | "hover";
        readonly_progress?: boolean;
        readonly_dates?: boolean;
        readonly?: boolean;
        scroll_to?: "today" | "start" | "end" | string;
        show_expected_progress?: boolean;
        today_button?: boolean;
        view_mode?: string | ViewMode;
        view_mode_select?: boolean;
        popup?: (popupContext: PopupContext) => false | undefined | string;
        on_click?: (task: Task) => void;
        on_date_change?: (task: Task, start: Date, end: Date) => void;
        on_progress_change?: (task: Task, progress: number) => void;
        on_view_change?: (mode: string) => void;
        view_modes?: ViewMode[];
    }

    export default class Gantt {
        constructor(container: HTMLElement, tasks: Task[], options?: GanttOptions);
        update_options(new_options: GanttOptions): void;
        change_view_mode(mode: string): void;
        scroll_current(): void;
        update_task(task_id: string, new_details: Task): void;
        refresh(tasks?: Task[]): void;
    }
}