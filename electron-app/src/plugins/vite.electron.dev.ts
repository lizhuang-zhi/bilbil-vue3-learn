// 开发环境插件
import type { Plugin } from 'vite';
import type { AddressInfo } from 'net';
// 进程传参法
import { buildSync } from 'esbuild';
import path from 'path';
import { spawn } from 'child_process';

export const ElectronDevPlugin = (): Plugin => {
    return {
        name: 'electron-dev',
        configureServer(server) {
            /* 
                vite开发环境使用的esbuild，打包时使用的是rollup
            */
            // buildSync同步打包
            buildSync({
                entryPoints: ['src/background.ts'],  // 入口文件
                bundle: true,  // 是否把所有的文件都打包进去
                outfile: 'dist/background.js',  // 输出文件
                platform: 'node',    // 平台
                target: 'node18',  // 目标环境
                external: ['electron'],  // 不打包electron
            })

            server?.httpServer?.on('listening', () => {
                // 读取vite服务信息
                const addressInfo = server.httpServer?.address() as AddressInfo;
                // 拼接ip地址 给electron启动服务时使用
                const IP = `http://localhost:${addressInfo.port}`
                // 第一个参数是electron的启动文件
                // electron不认识ts文件，所以编译成js文件：dist/background.js
                // 进程传参法发送给electron IP：参数 0 1 2

                const electronPath = path.resolve(__dirname,  '..', 'node_modules', '.bin', 'electron');
                console.log('Electron Path:', electronPath);
                spawn(electronPath, ['dist/background.js', IP]);
                console.log(IP);
            });
        }
    }
}