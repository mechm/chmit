
export type AboutMe = {
  Page: Page  
}

  export type Page = {
    PageId: number;
    Title: string;
    Description: string;
    Keywords: string;
  };
  
  export type Testimonial = {
    TestimonialId: number;
    Name: string;
    Title: string;
    Description: string;
  };

  export type Availability = {
    Month: string;
    Percentage: number;
  };

  export type Skill = {
    SkillId: number;
    Name: string;
    Description: string;
    Percentage: number;
  };