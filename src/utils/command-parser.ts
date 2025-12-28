// Command parser for terminal navigation
export interface CommandResult {
    success: boolean;
    action?: 'NAVIGATE' | 'LIST' | 'HELP' | 'CLEAR' | 'PWD' | 'NONE';
    module?: string | null;
    message: string;
    type?: 'SYSTEM' | 'ERROR' | 'INFO';
}

const moduleMap: Record<string, string | null> = {
    'projects': 'PROJECTS',
    'dependencies': 'STACK',
    'stack': 'STACK',
    'sys_logs': 'EXPERIENCE',
    'experience': 'EXPERIENCE',
    'system_commands': 'SYSTEM_COMMANDS',
    'commands': 'SYSTEM_COMMANDS',
    'healiora': 'HEALIORA',
    'access': 'ACCESS',
    'connect': 'ACCESS',
    'home': null,
    '~': null,
    '..': 'BACK'
};

const moduleList = [
    'PROJECTS',
    'DEPENDENCIES',
    'SYS_LOGS',
    'SYSTEM_COMMANDS',
    'HEALIORA',
    'ACCESS'
];

export function parseCommand(input: string, currentModule: string | null): CommandResult {
    const trimmed = input.trim().toLowerCase();

    if (!trimmed) {
        return {
            success: false,
            action: 'NONE',
            message: '',
            type: 'SYSTEM'
        };
    }

    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    // cd command
    if (command === 'cd') {
        if (args.length === 0) {
            return {
                success: false,
                action: 'NONE',
                message: 'cd: missing operand. Usage: cd <module> or cd ..',
                type: 'ERROR'
            };
        }

        const target = args[0];

        if (target === '..') {
            if (!currentModule) {
                return {
                    success: false,
                    action: 'NONE',
                    message: 'Already at root directory',
                    type: 'ERROR'
                };
            }
            return {
                success: true,
                action: 'NAVIGATE',
                module: null,
                message: 'Returning to SYSTEM_OVERVIEW',
                type: 'SYSTEM'
            };
        }

        const moduleId = moduleMap[target];

        if (moduleId === undefined) {
            return {
                success: false,
                action: 'NONE',
                message: `cd: ${target}: No such module. Type 'ls' to see available modules.`,
                type: 'ERROR'
            };
        }

        if (moduleId === null) {
            return {
                success: true,
                action: 'NAVIGATE',
                module: null,
                message: 'Returning to SYSTEM_OVERVIEW',
                type: 'SYSTEM'
            };
        }

        return {
            success: true,
            action: 'NAVIGATE',
            module: moduleId,
            message: `Navigating to ${moduleId}...`,
            type: 'SYSTEM'
        };
    }

    // ls command
    if (command === 'ls') {
        const modules = moduleList.join('  ');
        return {
            success: true,
            action: 'LIST',
            message: `Available modules:\n${modules}`,
            type: 'INFO'
        };
    }

    // pwd command
    if (command === 'pwd') {
        const location = currentModule
            ? `~/${currentModule.toLowerCase().replace('_', '-')}`
            : '~';
        return {
            success: true,
            action: 'PWD',
            message: location,
            type: 'INFO'
        };
    }

    // help command
    if (command === 'help') {
        const helpText = `Available commands:
  cd <module>    Navigate to module
  cd ..          Return to home
  ls             List available modules
  pwd            Show current location
  help           Show this help message
  clear          Clear terminal output

Available modules:
  projects, dependencies, sys_logs, system_commands, healiora, access`;

        return {
            success: true,
            action: 'HELP',
            message: helpText,
            type: 'INFO'
        };
    }

    // clear command
    if (command === 'clear') {
        return {
            success: true,
            action: 'CLEAR',
            message: 'Terminal cleared',
            type: 'SYSTEM'
        };
    }

    // Unknown command
    return {
        success: false,
        action: 'NONE',
        message: `${command}: command not found. Type 'help' for available commands.`,
        type: 'ERROR'
    };
}

export function getPrompt(currentModule: string | null): string {
    const location = currentModule
        ? `~/${currentModule.toLowerCase().replace('_', '-')}`
        : '~';
    return `system@hvy:${location}$`;
}
