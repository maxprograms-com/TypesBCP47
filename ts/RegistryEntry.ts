/*******************************************************************************
 * Copyright (c) 2023-2026 Maxprograms.
 *
 * This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/org/documents/epl-v10.html
 *
 * Contributors:
 *     Maxprograms - initial API and implementation
 *******************************************************************************/

export class RegistryEntry {

    entryMap: Map<string, string>;

    constructor(entry: string) {
        this.entryMap = new Map<string, string>();
        let lines = entry.split('\n');
        let lastType: string | undefined;
        for (let line of lines) {
            if (line.startsWith(' ') || line.startsWith('\t')) {
                if (lastType) {
                    let value: string = line.trim();
                    let oldValue: string = this.entryMap.get(lastType) as string;
                    this.entryMap.set(lastType, oldValue + ' ' + value);
                }
                continue;
            }
            let separator: number = line.indexOf(':');
            if (separator === -1) {
                continue;
            }
            let type: string = line.substring(0, separator).trim();
            let value: string = line.substring(separator + 1).trim();
            lastType = type;
            if (!this.entryMap.has(type)) {
                this.entryMap.set(type, value);
            } else {
                let oldValue: string = this.entryMap.get(type) as string;
                this.entryMap.set(type, oldValue + ' | ' + value);
            }
        }
    }

    getTypes(): Set<string> {
        return new Set(this.entryMap.keys());
    }

    get(type: string): string | undefined {
        return this.entryMap.get(type);
    }

    getType(): string | undefined {
        return this.entryMap.get('Type');
    }

    getDescription(): string | undefined {
        return this.entryMap.get('Description');
    }

    getSubtag(): string | undefined {
        return this.entryMap.get('Subtag');
    }
}