# TODO: Add the finished report PDF in the repo

<div align="center">
    <img src="sec3_gr5_fe_src/public/img/general/logo-orange.svg" alt="Keychrome Logo" width='auto' height='auto'>
    <br>
    ITCS223 Section 3, Group 5
    <br>

| Name                 | ID      |
| -------------------- | ------- |
| Waris Sripatoomrak   | 6788112 |
| Wachiravich Thaosiri | 6788130 |
| Warawuth Ngamluea    | 6788200 |
| Zwe Nyan Zaw         | 6788236 |

</div>

# Walk-Through

## Directory Structure

```
📂 .
├── 📂 sec3_gr5_fe_src
│   ├── 📂 public
│   │   ├── 📁 css
│   │   └── 📂 img
│   │       ├── 📁 general
│   │       ├── 📁 homepage
│   │       ├── 📁 profiles
│   │       └── 📁 search
│   ├── 📁 src
│   └── 📂 views
│       ├── 📁 pages
│       └── 📁 partials
└── 📂 sec3_gr5_ws_src
    └── 📂 src
        ├── 📁 db
        └── 📁 routes
```

## Prerequisites

> [!IMPORTANT]
> **Before you begin, please ensure you have the following components installed:**
> - Node.js (LTS version recommended);
> - A package manager (`npm`);
> - Runnable Linux Environment Shell;
> - Stable Internet connection (Mahidol WiFi may cause an error).

### Step 0: Clone the Project

- You must clone the repository before we begin.
  - Clone via SSH:
    ```shell
    git clone git@github.com:MUICT-Class/682-projectphase2-68_section3_group05.git
    ```
  - Clone via HTTP:
    ```shell
    git clone https://github.com/MUICT-Class/682-projectphase2-68_section3_group05.git
    ```

### Step 1: Starting the Web Services

1. At the root folder, open terminal and enter the web services folder by running this:
   ```shell
   cd sec3_gr5_ws_src
   ```
2. Then, install the required packages via `npm`:
   ```shell
   npm i
   ```
3. Run the web services:
   ```shell
   npm start
   ```
4. Your web services are now running at port `3003`.

Next, we will start the web application.

### Step 2: Starting the Web Application

1. Open another terminal in root folder and enter the web services folder by running
   this:
   ```shell
   cd sec3_gr5_fe_src
   ```
2. Then, install the required packages via `npm`:
   ```shell
   npm i
   ```
3. Run the web application:
   ```shell
   npm start
   ```
4. Your web application is now running at port `3030`.

## Additional Information

### Login Details

| Email                    | Password       |
| ------------------------ | -------------- |
| `warawuth@mu.edu`        | `Passw0rd123!` |
| `bobby.b@mail.com`       | `M1necr@ftF@n` |
| `alice.smith@gmail.com`  | `S3cr3tP@ss`   |
| `jdoe99@yahoo.com`       | `QwertyUIOP`   |
| `emma.w@outlook.com`     | `Hogw@rts99`   |
| `lmuller@bscc.de`        | `Bremen2026!`  |
| `schen.dev@gmail.com`    | `C0d1ng!sFun`  |
| `liam.j@hotmail.com`     | `L!amJ0hnson`  |
| `olivia.davis@gmail.com` | `0liviaD@vis`  |
| `nmartinez@yahoo.com`    | `N0@hM@rt1nez` |

### Stock Keeping Unit Codes (SKUs)

| SKU             | Product Name                             |
| --------------- | ---------------------------------------- |
| `CBL-COILED-BL` | Premium coiled aviator cable             |
| `DESKMAT-L-BLK` | Large smooth surface desk mat            |
| `K1-PRO-RED`    | Low profile wireless mechanical keyboard |
| `K3-LITE`       | Ultra-slim wireless keyboard             |
| `K8-PRO-WL`     | Wireless TKL mechanical keyboard         |
| `KC-PBT-WHT`    | Double-shot PBT keycap set               |
| `M1-WL-MOUSE`   | Ultra-lightweight wireless mouse         |
| `M2-ERGO`       | Ergonomic vertical wireless mouse        |
| `Q1-MAX-WHT`    | Premium custom aluminum keyboard         |
| `SW-CHY-BRN-35` | Cherry MX Brown switches (35 pcs)        |
| `SW-GAT-RED-35` | Gateron G Pro Red switches (35 pcs)      |
| `V1-CUSTOM`     | Wired custom mechanical keyboard         |

# Troubleshooting

## CASE1

1. Lorem ipsum dolor sit amet
2. Lorem ipsum dolor sit amet
3. Lorem ipsum dolor sit amet

## CASE2

1. Lorem ipsum dolor sit amet
2. Lorem ipsum dolor sit amet
3. Lorem ipsum dolor sit amet

## CASE3

1. Lorem ipsum dolor sit amet
2. Lorem ipsum dolor sit amet
3. Lorem ipsum dolor sit amet

# Remarks

1. This project uses Supabase as a cloud database, the `sec3_gr5_database.sql`
   file is not needed locally but used as a reference.
