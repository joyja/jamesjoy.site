---
title: "Hyperconverged with Microk8s and Ceph 2"
description: "Part 2: Getting the Orange Pi to Boot from NVME"
author: 'James A. Joy'
date: '2023-06-20'
updated: '2023-06-20'
published: true
---

Now that I have the machines all ready to go with SD Cards and NVMe drives it's time to get the Orange Pi's to boot from the NVME drives.

![Three Orange Pi 5](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto,w_700/v1687297311/jamesjoy.site/Orange%20Pi%205%20Triplet.jpg)

Pay no mind to the missing power button and terrible shape of the cord on the leftmost Orange Pi 5. I am well aware of the jankiness and it will be fixed in due time. I was just too lazy to fix it for this photo.

To get these to boot off of NVME I followed [this Crosstalk Solutions guide](https://www.crosstalksolutions.com/orange-pi-5-simple-overview-and-installation-with-m-2-ssd/) to the letter and it worked perfectly. The only thing I'll add to the guide here is what my performance looked like before and after moving to the NVME:
<br />

## SD Card

```bash
Category                  Test                      Result
--------                  --------                  --------
HDParm                    Disk Read                 45.51 MB/s               
HDParm                    Cached Disk Read          60.40 MB/s               
DD                        Disk Write                40.1 MB/s                
FIO                       4k random read            3050 IOPS (12203 KB/s)   
FIO                       4k random write           767 IOPS (3071 KB/s)     
IOZone                    4k read                   12542 KB/s               
IOZone                    4k write                  2660 KB/s                
IOZone                    4k random read            9747 KB/s                
IOZone                    4k random write           2578 KB/s                

                          Score: 1409                                        
```
<br/>

## NVME

```bash
Category                  Test                      Result     
--------                  --------                  --------
HDParm                    Disk Read                 364.93 MB/s              
HDParm                    Cached Disk Read          370.01 MB/s              
DD                        Disk Write                257 MB/s                 
FIO                       4k random read            48530 IOPS (194123 KB/s) 
FIO                       4k random write           34829 IOPS (139319 KB/s) 
IOZone                    4k read                   16734 KB/s               
IOZone                    4k write                  108688 KB/s              
IOZone                    4k random read            39095 KB/s               
IOZone                    4k random write           80000 KB/s               

                          Score: 18873                                       
```

Many times better!
