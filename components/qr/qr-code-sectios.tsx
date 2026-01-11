import { Translate, useTranslate } from '~/i18n';
import Image from '../shared/image';
import { Icon } from '@iconify/react';
import { GuestTicketType } from '~/interfaces/guestTicket';
import classNames from 'classnames';

type QrCodeSectionsProps = {
   guest: GuestTicketType;
};

const QrCodeSections = ({ guest }: QrCodeSectionsProps) => {
   const { lang } = useTranslate();
   const icons = {
      location: '/images/about/location.svg',
      time: '/images/about/time.svg',
      dates: '/images/about/dates.svg',
      ticket: '/images/about/ticket.svg',
   };

   const socials = [
      {
         href: 'https://x.com/sdb_sa',
         icon: 'hugeicons:new-twitter',
         label: 'X (Twitter)',
      },
      {
         href: 'https://instagram.com/sdbbank',
         icon: 'mdi:instagram',
         label: 'Instagram',
      },
      {
         href: 'https://www.tiktok.com/@sdb_sa',
         icon: 'ph:tiktok-logo',
         label: 'TikTok',
      },
      {
         href: 'https://www.linkedin.com/company/scsb',
         icon: 'mdi:linkedin',
         label: 'LinkedIn',
      },
      {
         href: 'https://www.youtube.com/@sdbank_sa',
         icon: 'mdi:youtube',
         label: 'YouTube',
      },
      {
         href: 'https://www.snapchat.com/add/sdbbank',
         icon: 'mdi:snapchat',
         label: 'Snapchat',
      },
   ];

   return (
      <section className="relative z-20 py-10 md:py-16">
         <div className="container">
            <div className="row justify-center">
               <div className="col-12 sm:col-8 lg:col-8 xl:col-6">
                  <div className="relative rounded-lg border shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] ">
                     {/* MAIN CARD */}
                     <div className=" mt-5 rounded-2xl px-4 pb-10 pt-6 shadow-none md:px-10">
                        {/* Heading */}
                        <div className=" ">
                           <h1 className="mb-2 text-3xl font-medium text-secondary md:text-5xl">
                              <Translate id="web:your_path" />
                              {/* طريقك للريادة */}
                           </h1>

                           <p className="mb-4 text-xl  text-primary md:text-2xl">
                              <Translate id="web:start_from_dv" />
                              {/* يبدأ من DeveGO */}
                           </p>

                           {/* Decorative shapes line */}
                           <img
                              src="/images/ticket/lines.svg"
                              alt=""
                              className="mb-4 h-8 max-w-[200px]  object-contain md:max-w-[300px]"
                           />

                           {/* استخدم الباركود للدخول */}
                           <p className="mt-5 text-lg font-bold text-primary">
                              <Translate id="web:use_qr_code_to_enter" />
                           </p>
                        </div>

                        {/* Date / Time / Location row */}
                        <div className="mt-5 flex w-full flex-col space-y-4 font-medium text-primary rtl:space-x-reverse md:flex-row md:items-center  md:space-y-0 md:space-x-5">
                           {/* Dates */}
                           <div className="text-sm ">
                              <div className="flex items-start gap-4">
                                 <div className="relative h-5 w-5 shrink-0">
                                    <Image
                                       src={'/images/shape_3.svg'}
                                       alt="dates"
                                       layout="fill"
                                       objectFit="contain"
                                       className="select-none"
                                    />
                                 </div>
                                 <div className="">
                                    <div className="mb-1">
                                       <Translate id="web:about_dates_range" />
                                    </div>
                                    <div className="">
                                       <Translate id="web:about_dates_month" />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Time */}
                           <div className="text-sm ">
                              <div className="flex items-start gap-4">
                                 <div className="relative h-5 w-5 shrink-0">
                                    <Image
                                       src={'/images/shape_2.svg'}
                                       alt="time"
                                       layout="fill"
                                       objectFit="contain"
                                       className="select-none"
                                    />
                                 </div>
                                 <div className="">
                                    <div className="mb-1 ">
                                       <Translate id="web:about_time_start" />
                                    </div>
                                    <div className="">
                                       <Translate id="web:about_time_end" />
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* Location */}
                           <div className="text-sm">
                              <div className="flex items-start gap-4">
                                 <div className="relative h-5 w-5 shrink-0">
                                    <Image
                                       src={'/images/shape_1.svg'}
                                       alt="location"
                                       layout="fill"
                                       objectFit="contain"
                                       className="select-none"
                                    />
                                 </div>
                                 <div className="">
                                    <a
                                       href="https://maps.app.goo.gl/KTaNvVWUfG2u1Drz9"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="hover:underline">
                                       <Translate id="web:about_location_line1" />
                                       <br />
                                       <Translate id="web:about_location_line2" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* Cards: Ticket + Location */}
                        <div className="mt-8 flex flex-wrap   gap-4 md:gap-8">
                           {/* Ticket / QR */}
                           <div className="h-[110px] w-[185px] rounded-2xl bg-white p-3 shadow-sm">
                              <div className="text-sm ">
                                 <div className="flex items-start justify-between gap-4">
                                    <div>
                                       <div className="mb-2 text-base font-semibold text-secondary">
                                          <Translate id="web:ticket" />
                                       </div>
                                       <div className="relative h-12 w-12 shrink-0">
                                          <Image
                                             src={icons.ticket}
                                             alt="location"
                                             layout="fill"
                                             objectFit="contain"
                                             className="select-none"
                                          />
                                       </div>
                                    </div>

                                    <div>
                                       <img
                                          src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=${'685bc7'}&data=${
                                             guest.registration_number
                                          }`}
                                          alt="QR Code"
                                          className="h-[85px] w-[85px]  "
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* Location card */}
                           <div className="h-[110px] w-[185px] rounded-2xl bg-white p-3 shadow-sm">
                              <div className="text-sm ">
                                 <div className="flex items-start  justify-between gap-4">
                                    <div>
                                       <div className="mb-2  text-base font-semibold text-secondary">
                                          <Translate id="web:location" />
                                       </div>
                                       <div className="relative h-10 w-10 shrink-0">
                                          <Image
                                             src={icons.location}
                                             alt="location"
                                             layout="fill"
                                             objectFit="contain"
                                             className="select-none"
                                          />
                                       </div>
                                    </div>

                                    <div className="">
                                       <img
                                          src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=${'685bc7'}&data=https://maps.app.goo.gl/KTaNvVWUfG2u1Drz9`}
                                          alt="QR Code"
                                          className="h-[85px] w-[85px] "
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Share text + socials */}
                        <div className="mt-8 font-medium text-secondary">
                           <p className="">
                              <Translate id="web:ticket_share_with_friends" />
                              {/* شارك أصحابك رابط التسجيل قبل اكتمال المقاعد! */}
                           </p>
                           {/* <p className="font-bold">{'deve-go.sa'}</p> */}
                           <p className="mb-3 text-primary">
                              <Translate id="web:ticket_follow_us" />
                              {/* <span dir="ltr">@SDB_sa</span> */}
                              {/* تابعنا واطّلع على المستجدات */}
                           </p>

                           {/* <div className="flex items-center gap-3 text-secondary-2">
                              <Icon icon="mdi:twitter" width="20" height="20" />
                              <Icon icon="mdi:instagram" width="20" height="20" />
                              <Icon icon="mdi:linkedin" width="20" height="20" />
                              <Icon icon="mdi:youtube" width="20" height="20" />
                           </div> */}

                           {/* Social icons */}
                           <div className="mt-2 flex gap-4">
                              {socials.map((item, index) => (
                                 <a
                                    key={index}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                    className="text-secondary-2 transition-colors hover:text-secondary-2/70">
                                    <Icon icon={item.icon} width="25" height="25" />
                                 </a>
                              ))}
                           </div>
                        </div>
                        {/* BOTTOM TAGLINE (لا تبدأ من الصفر ... ) */}
                        <div className="relative mt-20">
                           <div className="h-[1px] w-1/2 bg-primary-300" />

                           {/* dont_start_form_zero.svg */}
                           {lang === 'ar' ? (
                              <div className="relative mt-4 h-[100px] w-[200px]">
                                 <Image
                                    src={'/images/ticket/dont_start_from_zero_4.png'}
                                    alt={`don't start from zero`}
                                    layout="fill"
                                    objectFit="contain"
                                    className="select-none"
                                 />
                              </div>
                           ) : (
                              <div className="relative mt-5 ltr:w-[250px]  rtl:w-[200px]">
                                 <div className=" font-medium leading-tight  text-secondary ltr:text-[24px] rtl:text-[28px]">
                                    <Translate id="web:ticket_dont_start_from_zero" />
                                 </div>
                                 <div className="absolute ltr:bottom-2 ltr:-right-0 rtl:bottom-2  rtl:-left-4">
                                    <img
                                       src="/images/ticket/devego-logo.svg"
                                       // alt="DeveGO"
                                       className=" h-4"
                                    />
                                 </div>
                              </div>
                           )}

                           {/* cricle shapes  */}
                           <div className="absolute bottom-0 hidden ltr:right-0 rtl:left-0 lg:block">
                              <img
                                 src="/images/ticket/circle.svg"
                                 alt=""
                                 className="mb-4 h-[150px] max-w-[300px] "
                              />
                           </div>
                        </div>

                        {/* SPONSORS LOGOS */}
                        <div>
                           {/* sponsored_by */}
                           <div className="mt-12 text-lg font-bold text-primary">
                              <Translate id="web:sponsored_by" />
                           </div>
                        </div>

                        {guest.sponsors && guest.sponsors.length > 0 && (
                           <div className="mt-4 space-y-6">
                              {guest.sponsors.map((sponsorRow, rowIndex) => (
                                 <div
                                    key={`row-${sponsorRow.row}`}
                                    className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                                    {sponsorRow.labels.map((group, groupIndex) => (
                                       <div
                                          key={
                                             group.label?.id ||
                                             `uncategorized-${rowIndex}-${groupIndex}`
                                          }
                                          className="flex flex-col items-center">
                                          {/* Label Title */}
                                          {group.label && (
                                             <div className="mb-1 text-center">
                                                <div className="text-xs font-semibold text-primary sm:text-sm">
                                                   {group.label.name}
                                                </div>
                                             </div>
                                          )}

                                          {/* Sponsors logos */}
                                          {group.sponsors && group.sponsors.length > 0 && (
                                             <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
                                                {group.sponsors.map((sponsor, sponsorIndex) => (
                                                   <div
                                                      key={sponsor.id || sponsorIndex}
                                                      className={classNames(
                                                         'relative',
                                                         // slightly smaller than main section, but same pattern
                                                         'h-[10px] w-[30px] sm:h-[15px] sm:w-[35px]'
                                                      )}>
                                                      {sponsor.logo_url ? (
                                                         <Image
                                                            src={sponsor.logo_url}
                                                            alt={sponsor.name}
                                                            layout="fill"
                                                            objectFit="contain"
                                                            className="select-none"
                                                         />
                                                      ) : (
                                                         <div className="flex h-full items-center justify-center text-[10px] font-semibold text-primary sm:text-xs">
                                                            {sponsor.name}
                                                         </div>
                                                      )}
                                                   </div>
                                                ))}
                                             </div>
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default QrCodeSections;
