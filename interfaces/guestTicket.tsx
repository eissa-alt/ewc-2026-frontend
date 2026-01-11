export interface Sponsor {
   id: string;
   name: string;
   logo_url: string | null;
   order: number;
}

export interface SponsorGroup {
   label: {
      id: number;
      name: string;
   } | null;
   sponsors: Sponsor[];
}

export interface SponsorRow {
   row: number;
   labels: SponsorGroup[];
}

export interface GuestTicketType {
   // step

   // gender: string | null;
   // title_id: string | null;
   // first_name: string | null;
   // last_name: string | null;
   // company: string | null;
   // job_title: string | null;
   personal_image_base64: string | null;

   // email: string | null;
   // phone: string | null;

   // category_name?: string | null;
   // status_name?: string | null;
   registration_number?: string | null;
   sponsors?: SponsorRow[];
}
