declare const ports: Readonly<Record<string, Readonly<Record<string, number>>>>;

export declare function getPorts(): typeof ports;

export declare function getPort(app: string, role: string): number;

export default ports;
