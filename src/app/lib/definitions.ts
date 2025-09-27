export interface RandomImage {
    titleAlt: string; 
    url: string;
    path: string;
}

export interface Page {
    pageid: number;
    template: Template;
    aliasTitle: string;
    metaDescription: string;
    title: string;
    mainImage: string;
    titleAlt: string;
    description: string;
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: string;
}

export interface Template {
    id: number;
    description: string;
}

export interface Portfolio {
    id: number;
    title: string;
    description: string;
    image: string;
    url: string;
    tags: PortfolioTag[];
}

export interface PortfolioTag {
    id: number;
    name: string;
}

export interface ClientLogo {
    id: number;
    name: string;
    image: string;
}

export interface Availability {
    id: number;
    month: number;
    year: number;
    percentage: number;
}

export interface EmailEnquiries {
    id: number;
    email: string;
    message: string;
    datetime : Date;
}

export interface Position {
    id: number;
    companyName: string;
    title: string;
    description: string;
    dateFrom: string; // ISO date string
    dateTo?: string;  // ISO date string, optional
}

export interface Testimonial {
    id: number;
    client: string;
    description: string;
    firstName: string;
    surname: string;
    position: string;
    image: string;
    titleAlt: string;
    date?: string; // ISO date string, optional
    registrationCode: string; // Guid as string
    confirmed: boolean;
}