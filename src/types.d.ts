declare global {
    interface Window {
        SysConfig: any; // 或者具体的类型声明，比如 { apiBaseUrl: string; }
    }
}
