export default [
    [
        {
            id: 'undo',
            description: 'Undo',
            callback: {
                name: 'getBranchFromHistory',
                arguments: [true]
            }
        },
        {
            id: 'redo',
            description: 'Redo',
            callback: {
                name: 'getBranchFromHistory',
                arguments: [false]
            }
        },
    ],
    [
        {
            id: 'bold',
            description: 'Bold',
            callback: {
                name: 'applyFormat',
                arguments: ['**']
            }
        },
        {
            id: 'italic',
            description: 'Italic',
            callback: {
                name: 'applyFormat',
                arguments: ['*']
            }
        },
        {
            id: 'strikethrough',
            description: 'Strikethrough',
            callback: {
                name: 'applyFormat',
                arguments: ['~~']
            }
        },
        {
            id: 'toUpper',
            description: 'To convert to uppercase',
            callback: {
                name: 'changeCase',
                arguments: ['upper']
            }
        },
        {
            id: 'toLower',
            description: 'To convert to lowercase',
            callback: {
                name: 'changeCase',
                arguments: ['lower']
            }
        },
    ],
    [
        {
            id: 'heading1',
            description: 'Heading 1',
            callback: {
                name: 'applyHeading',
                arguments: ['#']
            }
        },
        {
            id: 'heading2',
            description: 'Heading 2',
            callback: {
                name: 'applyHeading',
                arguments: ['##']
            }
        },
        {
            id: 'heading3',
            description: 'Heading 3',
            callback: {
                name: 'applyHeading',
                arguments: ['###']
            }
        },
        {
            id: 'heading4',
            description: 'Heading 4',
            callback: {
                name: 'applyHeading',
                arguments: ['####']
            }
        },
        {
            id: 'heading5',
            description: 'Heading 5',
            callback: {
                name: 'applyHeading',
                arguments: ['#####']
            }
        },
        {
            id: 'heading6',
            description: 'Heading 6',
            callback: {
                name: 'applyHeading',
                arguments: ['######']
            }
        }
    ],
    [
        {
            id: 'clear',
            description: 'Clear',
            callback: {
                name: 'clearArea',
                arguments: []
            }
        }
    ]
];