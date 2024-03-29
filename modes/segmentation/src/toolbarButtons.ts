import {
  // ExpandableToolbarButton,
  // ListMenu,
  WindowLevelMenuItem,
} from '@ohif/ui';
import { defaults } from '@ohif/core';

const { windowLevelPresets } = defaults;
/**
 *
 * @param {*} type - 'tool' | 'action' | 'toggle'
 * @param {*} id
 * @param {*} icon
 * @param {*} label
 */
function _createButton(type, id, icon, label, commands, tooltip, uiType) {
  return {
    id,
    icon,
    label,
    type,
    commands,
    tooltip,
    uiType,
  };
}
const ReferenceLinesCommands: RunCommand = [
  {
    commandName: 'setSourceViewportForReferenceLinesTool',
    context: 'CORNERSTONE',
  },
  {
    commandName: 'setToolActive',
    commandOptions: {
      toolName: 'ReferenceLines',
    },
    context: 'CORNERSTONE',
  },
];

const _createActionButton = _createButton.bind(null, 'action');
const _createToggleButton = _createButton.bind(null, 'toggle');
const _createToolButton = _createButton.bind(null, 'tool');

/**
 *
 * @param {*} preset - preset number (from above import)
 * @param {*} title
 * @param {*} subtitle
 */
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: preset.toString(),
    title,
    subtitle,
    type: 'action',
    commands: [
      {
        commandName: 'setWindowLevel',
        commandOptions: {
          ...windowLevelPresets[preset],
        },
        context: 'CORNERSTONE',
      },
    ],
  };
}

const toolGroupIds = ['default', 'mpr', 'SRToolGroup'];

/**
 * Creates an array of 'setToolActive' commands for the given toolName - one for
 * each toolGroupId specified in toolGroupIds.
 * @param {string} toolName
 * @returns {Array} an array of 'setToolActive' commands
 */
function _createSetToolActiveCommands(toolName) {
  const temp = toolGroupIds.map(toolGroupId => ({
    commandName: 'setToolActive',
    commandOptions: {
      toolGroupId,
      toolName,
    },
    context: 'CORNERSTONE',
  }));
  return temp;
}

const toolbarButtons = [
  // Zoom..
  {
    id: 'Zoom',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-zoom',
      label: 'Zoom',
      commands: _createSetToolActiveCommands('Zoom'),
    },
  },
  // Window Level + Presets...
  {
    id: 'WindowLevel',
    type: 'ohif.splitButton',
    props: {
      groupId: 'WindowLevel',
      primary: _createToolButton(
        'WindowLevel',
        'tool-window-level',
        'Window Level',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'WindowLevel',
            },
            context: 'CORNERSTONE',
          },
        ],
        'Window Level'
      ),
      secondary: {
        icon: 'chevron-down',
        label: 'W/L Manual',
        isActive: true,
        tooltip: 'W/L Presets',
      },
      isAction: true, // ?
      renderer: WindowLevelMenuItem,
      items: [
        _createWwwcPreset(1, 'Soft tissue', '400 / 40'),
        _createWwwcPreset(2, 'Lung', '1500 / -600'),
        _createWwwcPreset(3, 'Liver', '150 / 90'),
        _createWwwcPreset(4, 'Bone', '2500 / 480'),
        _createWwwcPreset(5, 'Brain', '80 / 40'),
      ],
    },
  },
  // Pan...
  {
    id: 'Pan',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-move',
      label: 'Pan',
      commands: _createSetToolActiveCommands('Pan'),
    },
  },
  {
    id: 'Capture',
    type: 'ohif.action',
    props: {
      icon: 'tool-capture',
      label: 'Capture',
      type: 'action',
      commands: [
        {
          commandName: 'showDownloadViewportModal',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Layout',
    type: 'ohif.layoutSelector',
    props: {
      rows: 12,
      columns: 12,
    },
  },
  {
    id: 'MPR',
    type: 'ohif.action',
    props: {
      type: 'toggle',
      icon: 'icon-mpr',
      label: 'MPR',
      commands: [
        {
          commandName: 'toggleHangingProtocol',
          commandOptions: {
            protocolId: 'mpr',
          },
          context: 'DEFAULT',
        },
      ],
    },
  },
  {
    id: 'Crosshairs',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-crosshair',
      label: 'Crosshairs',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Crosshairs',
            toolGroupId: 'mpr',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Saleh Abbas
  {
    id: 'Reset',
    type: 'ohif.action',
    props: _createActionButton(
      'Reset',
      'tool-reset',
      'Reset View',
      [
        {
          commandName: 'resetViewport',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
      'Reset'
    ),
  },
  {
    id: 'rotate-right',
    type: 'ohif.radioGroup',
    props: _createActionButton(
      'rotate-right',
      'tool-rotate-right',
      'Rotate Right',
      [
        {
          commandName: 'rotateViewportCW',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
      'Rotate +90'
    ),
  },
  {
    id: 'flip-horizontal',
    type: 'ohif.action',
    props: _createActionButton(
      'flip-horizontal',
      'tool-flip-horizontal',
      'Flip Horizontally',
      [
        {
          commandName: 'flipViewportHorizontal',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
      'Flip Horizontal'
    ),
  },
  {
    id: 'StackImageSync',
    type: 'ohif.toggle',
    props: _createToggleButton(
      'StackImageSync',
      'link',
      'Stack Image Sync',
      [
        {
          commandName: 'toggleStackImageSync',
        },
      ],
      'Enable position synchronization on stack viewports'
    ),
  },
  {
    id: 'ReferenceLines',
    type: 'ohif.toggle',
    props: _createToggleButton(
      'ReferenceLines',
      'tool-referenceLines', // change this with the new icon
      'Reference Lines',
      ReferenceLinesCommands,
      'Show Reference Lines'
    ),
  },

  {
    id: 'StackScroll',
    type: 'ohif.radioGroup',
    props: _createToolButton(
      'StackScroll',
      'tool-stack-scroll',
      'Stack Scroll',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'StackScroll',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Stack Scroll'
    ),
  },
  {
    id: 'InvertColors',
    type: 'ohif.action',
    props: _createActionButton(
      'invert',
      'tool-invert',
      'Invert',
      [
        {
          commandName: 'invertViewport',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
      'Invert Colors'
    ),
  },
  {
    id: 'Cine',
    type: 'ohif.toggle',
    props: _createToggleButton(
      'cine',
      'tool-cine',
      'Cine',
      [
        {
          commandName: 'toggleCine',
          context: 'CORNERSTONE',
        },
      ],
      'Cine'
    ),
  },

  {
    id: 'Magnify',
    type: 'ohif.action',
    props: _createToolButton(
      'Magnify',
      'tool-magnify',
      'Magnify',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Magnify',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Magnify'
    ),
  },
  {
    id: 'DicomTagBrowser',
    type: 'ohif.action',
    props: _createActionButton(
      'TagBrowser',
      'list-bullets',
      'Dicom Tag Browser',
      [
        {
          commandName: 'openDICOMTagViewer',
          commandOptions: {},
          context: 'DEFAULT',
        },
      ],
      'Dicom Tag Browser'
    ),
  },

  // More...
  // {
  //   id: 'MoreTools',
  //   type: 'ohif.splitButton',
  //   props: {
  //     isRadio: true, // ?
  //     groupId: 'MoreTools',
  //     primary: _createActionButton(
  //       'Reset',
  //       'tool-reset',
  //       'Reset View',
  //       [
  //         {
  //           commandName: 'resetViewport',
  //           commandOptions: {},
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Reset'
  //     ),
  //     secondary: {
  //       icon: 'chevron-down',
  //       label: '',
  //       isActive: true,
  //       tooltip: 'More Tools',
  //     },
  //     items: [
  //       _createActionButton(
  //         'Reset',
  //         'tool-reset',
  //         'Reset View',
  //         [
  //           {
  //             commandName: 'resetViewport',
  //             commandOptions: {},
  //             context: 'CORNERSTONE',
  //           },
  //         ],
  //         'Reset'
  //       ),
  //       _createActionButton(
  //         'rotate-right',
  //         'tool-rotate-right',
  //         'Rotate Right',
  //         [
  //           {
  //             commandName: 'rotateViewportCW',
  //             commandOptions: {},
  //             context: 'CORNERSTONE',
  //           },
  //         ],
  //         'Rotate +90'
  //       ),
  //       _createActionButton(
  //         'flip-horizontal',
  //         'tool-flip-horizontal',
  //         'Flip Horizontally',
  //         [
  //           {
  //             commandName: 'flipViewportHorizontal',
  //             commandOptions: {},
  //             context: 'CORNERSTONE',
  //           },
  //         ],
  //         'Flip Horizontal'
  //       ),
  //       _createToggleButton('StackImageSync', 'link', 'Stack Image Sync', [
  //         {
  //           commandName: 'toggleStackImageSync',
  //           commandOptions: {},
  //           context: 'CORNERSTONE',
  //         },
  //       ]),
  //       _createToggleButton(
  //         'ReferenceLines',
  //         'tool-referenceLines', // change this with the new icon
  //         'Reference Lines',
  //         [
  //           {
  //             commandName: 'toggleReferenceLines',
  //             commandOptions: {},
  //             context: 'CORNERSTONE',
  //           },
  //         ]
  //       ),
  //       _createToolButton(
  //         'StackScroll',
  //         'tool-stack-scroll',
  //         'Stack Scroll',
  //         [
  //           {
  //             commandName: 'setToolActive',
  //             commandOptions: {
  //               toolName: 'StackScroll',
  //             },
  //             context: 'CORNERSTONE',
  //           },
  //         ],
  //         'Stack Scroll'
  //       ),
  //       _createActionButton(
  //         'invert',
  //         'tool-invert',
  //         'Invert',
  //         [
  //           {
  //             commandName: 'invertViewport',
  //             commandOptions: {},
  //             context: 'CORNERSTONE',
  //           },
  //         ],
  //         'Invert Colors'
  //       ),
  //       _createToggleButton(
  //         'cine',
  //         'tool-cine',
  //         'Cine',
  //         [
  //           {
  //             commandName: 'toggleCine',
  //             context: 'CORNERSTONE',
  //           },
  //         ],
  //         'Cine'
  //       ),
  //       _createToolButton(
  //         'Magnify',
  //         'tool-magnify',
  //         'Magnify',
  //         [
  //           {
  //             commandName: 'setToolActive',
  //             commandOptions: {
  //               toolName: 'Magnify',
  //             },
  //             context: 'CORNERSTONE',
  //           },
  //         ],
  //         'Magnify'
  //       ),
  //       _createActionButton(
  //         'TagBrowser',
  //         'list-bullets',
  //         'Dicom Tag Browser',
  //         [
  //           {
  //             commandName: 'openDICOMTagViewer',
  //             commandOptions: {},
  //             context: 'DEFAULT',
  //           },
  //         ],
  //         'Dicom Tag Browser'
  //       ),
  //     ],
  //   },
  // },
];

export default toolbarButtons;
