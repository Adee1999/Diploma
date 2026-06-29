/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DocumentType = 'certificate' | 'diploma' | 'honor';

export type DocumentOrientation = 'landscape' | 'portrait';

export type TemplateId = 'classic-gold' | 'modern-blue' | 'emerald-luxury' | 'crimson-minimal';

export interface CertificateData {
  type: DocumentType;
  title: string;
  subtitle: string;
  recipient: string;
  description: string;
  organization: string;
  date: string;
  signatureName: string;
  signatureTitle: string;
  serialNumber: string;
  orientation: DocumentOrientation;
  templateId: TemplateId;
  showSeal: boolean;
  sealText: string;
  showRibbon: boolean;
  primaryColor: string;
  secondaryColor: string;
  customBackground?: string; // Base64 of custom uploaded template image
}

export interface PresetTemplate {
  id: string;
  name: string;
  data: CertificateData;
  thumbnail: string;
}
