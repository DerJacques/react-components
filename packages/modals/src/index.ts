/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export { Modal } from './elements/Modal';

export { Body } from './elements/Body';
export { Close } from './elements/Close';
export { Footer } from './elements/Footer';
export { FooterItem } from './elements/FooterItem';
export { Header } from './elements/Header';

export { TooltipModal } from './elements/TooltipModal/TooltipModal';

export { DrawerModal } from './elements/DrawerModal/DrawerModal';

export { PLACEMENT } from './types';

export type {
  IModalProps,
  IDrawerModalProps,
  ITooltipModalProps,
  /* @deprecated type can be dereferenced from the exported interfaces */
  Placement as GARDEN_PLACEMENT
} from './types';
