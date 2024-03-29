// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l
import {
  // ExpandableToolbarButton,
  // ListMenu,
  WindowLevelMenuItem,
} from '@ohif/ui';
import { defaults, ToolbarService } from '@ohif/core';
import type { Button, RunCommand } from '@ohif/core/types';
import { EVENTS } from '@cornerstonejs/core';

const { windowLevelPresets } = defaults;

const _createActionButton = ToolbarService._createButton.bind(null, 'action');
const _createToggleButton = ToolbarService._createButton.bind(null, 'toggle');
const _createToolButton = ToolbarService._createButton.bind(null, 'tool');

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

const toolbarButtons: Button[] = [
  // Measurement
  {
    id: 'MeasurementTools',
    type: 'ohif.splitButton',
    props: {
      groupId: 'MeasurementTools',
      isRadio: true, // ?
      // Switch?
      primary: _createToolButton(
        'Length',
        'tool-length',
        'Length',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'Length',
            },
            context: 'CORNERSTONE',
          },
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'SRLength',
              toolGroupId: 'SRToolGroup',
            },
            // we can use the setToolActive command for this from Cornerstone commandsModule
            context: 'CORNERSTONE',
          },
        ],
        'Length'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More Measure Tools',
      },
      items: [
        _createToolButton(
          'Length',
          'tool-length',
          'Length',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Length',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRLength',
                toolGroupId: 'SRToolGroup',
              },
              // we can use the setToolActive command for this from Cornerstone commandsModule
              context: 'CORNERSTONE',
            },
          ],
          'Length Tool'
        ),
        _createToolButton(
          'Bidirectional',
          'tool-bidirectional',
          'Bidirectional',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Bidirectional',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRBidirectional',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Bidirectional Tool'
        ),
        _createToolButton(
          'ArrowAnnotate',
          'tool-annotate',
          'Annotation',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ArrowAnnotate',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRArrowAnnotate',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Arrow Annotate'
        ),
        _createToolButton(
          'EllipticalROI',
          'tool-elipse',
          'Ellipse',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'EllipticalROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SREllipticalROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Ellipse Tool'
        ),
        _createToolButton(
          'CircleROI',
          'tool-circle',
          'Circle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'CircleROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRCircleROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Circle Tool'
        ),
      ],
    },
  },
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
  // Saleh Abbas
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
  // More...
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
      'Enable position synchronization on stack viewports',
      {
        listeners: {
          [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
            commandName: 'toggleStackImageSync',
            commandOptions: { toggledState: true },
          },
        },
      }
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
      'Show Reference Lines',
      {
        listeners: {
          [EVENTS.STACK_VIEWPORT_NEW_STACK]: ReferenceLinesCommands,
          [EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesCommands,
        },
      }
    ),
  },

  {
    id: 'ImageOverlayViewer',
    type: 'ohif.toggle',
    props: _createToggleButton(
      'ImageOverlayViewer',
      'toggle-dicom-overlay',
      'Image Overlay',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'ImageOverlayViewer',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Image Overlay',
      { isActive: true }
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
    id: 'Probe',
    type: 'ohif.action',
    props: _createToolButton(
      'Probe',
      'tool-probe',
      'Probe',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'DragProbe',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Probe'
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
    id: 'Angle',
    type: 'ohif.action',
    props: _createToolButton(
      'Angle',
      'tool-angle',
      'Angle',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Angle',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Angle'
    ),
  },
  {
    id: 'CobbAngle',
    type: 'ohif.action',
    props: _createToolButton(
      'Cobb Angle',
      'tool-cobb-angle',
      'Cobb Angle',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'CobbAngle',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Cobb Angle'
    ),
  },
  {
    id: 'PlanarFreehandROI',
    type: 'ohif.action',
    props: _createToolButton(
      'Planar Freehand ROI',
      'tool-freehand',
      'PlanarFreehandROI',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'PlanarFreehandROI',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Planar Freehand ROI'
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
    id: 'RectangleROI',
    type: 'ohif.toggle',
    props: _createToolButton(
      'Rectangle',
      'tool-rectangle',
      'Rectangle',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'RectangleROI',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Rectangle'
    ),
  },
  {
    id: 'CalibrationLine',
    type: 'ohif.toggle',
    props: _createToolButton(
      'CalibrationLine',
      'tool-calibration',
      'Calibration',
      [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'CalibrationLine',
          },
          context: 'CORNERSTONE',
        },
      ],
      'Calibration Line'
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
  //     _createActionButton(
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
  //     _createActionButton(
  //       'rotate-right',
  //       'tool-rotate-right',
  //       'Rotate Right',
  //       [
  //         {
  //           commandName: 'rotateViewportCW',
  //           commandOptions: {},
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Rotate +90'
  //     ),
  //     _createActionButton(
  //       'flip-horizontal',
  //       'tool-flip-horizontal',
  //       'Flip Horizontally',
  //       [
  //         {
  //           commandName: 'flipViewportHorizontal',
  //           commandOptions: {},
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Flip Horizontal'
  //     ),
  //     _createToggleButton(
  //       'StackImageSync',
  //       'link',
  //       'Stack Image Sync',
  //       [
  //         {
  //           commandName: 'toggleStackImageSync',
  //         },
  //       ],
  //       'Enable position synchronization on stack viewports',
  //       {
  //         listeners: {
  //           [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
  //             commandName: 'toggleStackImageSync',
  //             commandOptions: { toggledState: true },
  //           },
  //         },
  //       }
  //     ),
  //     _createToggleButton(
  //       'ReferenceLines',
  //       'tool-referenceLines', // change this with the new icon
  //       'Reference Lines',
  //       ReferenceLinesCommands,
  //       'Show Reference Lines',
  //       {
  //         listeners: {
  //           [EVENTS.STACK_VIEWPORT_NEW_STACK]: ReferenceLinesCommands,
  //           [EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesCommands,
  //         },
  //       }
  //     ),
  //     _createToggleButton(
  //       'ImageOverlayViewer',
  //       'toggle-dicom-overlay',
  //       'Image Overlay',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'ImageOverlayViewer',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Image Overlay',
  //       { isActive: true }
  //     ),
  //     _createToolButton(
  //       'StackScroll',
  //       'tool-stack-scroll',
  //       'Stack Scroll',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'StackScroll',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Stack Scroll'
  //     ),
  //     _createActionButton(
  //       'invert',
  //       'tool-invert',
  //       'Invert',
  //       [
  //         {
  //           commandName: 'invertViewport',
  //           commandOptions: {},
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Invert Colors'
  //     ),
  //     _createToolButton(
  //       'Probe',
  //       'tool-probe',
  //       'Probe',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'DragProbe',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Probe'
  //     ),
  //     _createToggleButton(
  //       'cine',
  //       'tool-cine',
  //       'Cine',
  //       [
  //         {
  //           commandName: 'toggleCine',
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Cine'
  //     ),
  //     _createToolButton(
  //       'Angle',
  //       'tool-angle',
  //       'Angle',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'Angle',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Angle'
  //     ),

  //     // Next two tools can be added once icons are added
  //     _createToolButton(
  //       'Cobb Angle',
  //       'tool-cobb-angle',
  //       'Cobb Angle',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'CobbAngle',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Cobb Angle'
  //     ),
  //     _createToolButton(
  //       'Planar Freehand ROI',
  //       'tool-freehand',
  //       'PlanarFreehandROI',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'PlanarFreehandROI',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Planar Freehand ROI'
  //     ),
  //     _createToolButton(
  //       'Magnify',
  //       'tool-magnify',
  //       'Magnify',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'Magnify',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Magnify'
  //     ),
  //     _createToolButton(
  //       'Rectangle',
  //       'tool-rectangle',
  //       'Rectangle',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'RectangleROI',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Rectangle'
  //     ),
  //     _createToolButton(
  //       'CalibrationLine',
  //       'tool-calibration',
  //       'Calibration',
  //       [
  //         {
  //           commandName: 'setToolActive',
  //           commandOptions: {
  //             toolName: 'CalibrationLine',
  //           },
  //           context: 'CORNERSTONE',
  //         },
  //       ],
  //       'Calibration Line'
  //     ),
  //     _createActionButton(
  //       'TagBrowser',
  //       'list-bullets',
  //       'Dicom Tag Browser',
  //       [
  //         {
  //           commandName: 'openDICOMTagViewer',
  //           commandOptions: {},
  //           context: 'DEFAULT',
  //         },
  //       ],
  //       'Dicom Tag Browser'
  //     ),
  //   ],
  // },
  // },
];

export default toolbarButtons;
