/*
Copyright (c) 2021-2022, NVIDIA CORPORATION.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { Input, Dialog, ButtonEnums } from '@ohif/ui';

function callInputDialog(uiDialogService, label, callback) {
  const dialogId = 'enter-segment-label';

  const onSubmitHandler = ({ action, value }) => {
    switch (action.id) {
      case 'save':
        callback(value.label, action.id);
        break;
      case 'cancel':
        callback('', action.id);
        break;
    }
    uiDialogService.dismiss({ id: dialogId });
  };

  if (uiDialogService) {
    uiDialogService.create({
      id: dialogId,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: Dialog,
      contentProps: {
        title: 'Segment',
        value: { label },
        noCloseButton: true,
        onClose: () => uiDialogService.dismiss({ id: dialogId }),
        actions: [
          { id: 'cancel', text: 'Cancel', type: ButtonEnums.type.secondary },
          { id: 'save', text: 'Confirm', type: ButtonEnums.type.primary },
        ],
        onSubmit: onSubmitHandler,
        body: ({ value, setValue }) => {
          return (
            <Input
              label='Enter the segment label'
              labelClassName='text-white text-[14px] leading-[1.2]'
              autoFocus
              className='border-primary-main bg-black'
              type='text'
              value={value.label}
              onChange={event => {
                event.persist();
                setValue(value => ({ ...value, label: event.target.value }));
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  onSubmitHandler({ value, action: { id: 'save' } });
                }
              }}
            />
          );
        },
      },
    });
  }
}

export default callInputDialog;