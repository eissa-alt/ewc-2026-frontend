export interface TitleType {
   id: string;
   name: string;
   allowed_genders: string[] | null;
   gender_specific_ar?: {
      male?: string;
      female?: string;
   } | null;
}
