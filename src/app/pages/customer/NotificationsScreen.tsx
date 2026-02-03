import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/app/context/AppContext';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Bell, Mail, MessageSquare, Calendar, FileText, Gift, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';

export const NotificationsScreen = () => {
  const navigate = useNavigate();
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadCount,
    notificationSettings,
    updateNotificationSettings,
  } = useApp();

  const [settings, setSettings] = useState(notificationSettings);
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');

  useEffect(() => {
    setSettings(notificationSettings);
  }, [notificationSettings]);

  const handleSettingChange = (key: string, value: boolean | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    updateNotificationSettings(settings);
    toast.success('Notification preferences saved!');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={20} className="text-[#FFC0CB]" />;
      case 'result':
        return <FileText size={20} className="text-[#ADD8E6]" />;
      case 'reminder':
        return <Bell size={20} className="text-yellow-500" />;
      default:
        return <Bell size={20} className="text-gray-400" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-white">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-white text-[#FFC0CB]">{unreadCount} new</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="flex gap-2 border-b border-gray-200 mt-4">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'notifications'
                ? 'border-b-2 border-[#FFC0CB] text-[#FFC0CB]'
                : 'text-[#A9A9A9]'
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'settings'
                ? 'border-b-2 border-[#FFC0CB] text-[#FFC0CB]'
                : 'text-[#A9A9A9]'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-4xl">
        {activeTab === 'notifications' ? (
          <div>
            {unreadCount > 0 && (
              <div className="mb-4 flex justify-end">
                <Button
                  onClick={markAllNotificationsAsRead}
                  variant="outline"
                  size="sm"
                  className="text-[#FFC0CB] border-[#FFC0CB]"
                >
                  Mark all as read
                </Button>
              </div>
            )}

            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell size={48} className="mx-auto text-[#A9A9A9] mb-4" />
                    <p className="text-[#A9A9A9]">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        notification.read
                          ? 'bg-white border-gray-200'
                          : 'bg-[#ADD8E6] bg-opacity-10 border-[#ADD8E6]'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="text-sm font-medium">{notification.title}</h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[#FFC0CB] rounded-full flex-shrink-0 ml-2 mt-1"></div>
                            )}
                          </div>
                          <p className="text-sm text-[#A9A9A9] mb-2">{notification.message}</p>
                          <p className="text-xs text-[#A9A9A9]">{formatTimestamp(notification.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Communication Preferences */}
            <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
              <h2 className="mb-4">Communication Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-[#FFC0CB]" />
                    <div>
                      <Label htmlFor="email">Email Notifications</Label>
                      <p className="text-xs text-[#A9A9A9]">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    id="email"
                    checked={settings.emailNotifications}
                    onCheckedChange={(val) => handleSettingChange('emailNotifications', val)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-[#FFC0CB]" />
                    <div>
                      <Label htmlFor="sms">SMS Notifications</Label>
                      <p className="text-xs text-[#A9A9A9]">Receive notifications via text message</p>
                    </div>
                  </div>
                  <Switch
                    id="sms"
                    checked={settings.smsNotifications}
                    onCheckedChange={(val) => handleSettingChange('smsNotifications', val)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-[#FFC0CB]" />
                    <div>
                      <Label htmlFor="push">Push Notifications</Label>
                      <p className="text-xs text-[#A9A9A9]">Receive in-app notifications</p>
                    </div>
                  </div>
                  <Switch
                    id="push"
                    checked={settings.pushNotifications}
                    onCheckedChange={(val) => handleSettingChange('pushNotifications', val)}
                  />
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
              <h2 className="mb-4">Notification Types</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-[#FFC0CB]" />
                    <div>
                      <Label htmlFor="appointments">Appointment Reminders</Label>
                      <p className="text-xs text-[#A9A9A9]">Get reminded about upcoming appointments</p>
                    </div>
                  </div>
                  <Switch
                    id="appointments"
                    checked={settings.appointmentReminders}
                    onCheckedChange={(val) => handleSettingChange('appointmentReminders', val)}
                  />
                </div>

                {settings.appointmentReminders && (
                  <div className="ml-8 pl-3 border-l-2 border-[#ADD8E6]">
                    <Label htmlFor="timing">Reminder Timing</Label>
                    <Select
                      value={settings.reminderTiming.toString()}
                      onValueChange={(val) => handleSettingChange('reminderTiming', parseInt(val))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour before</SelectItem>
                        <SelectItem value="3">3 hours before</SelectItem>
                        <SelectItem value="6">6 hours before</SelectItem>
                        <SelectItem value="12">12 hours before</SelectItem>
                        <SelectItem value="24">1 day before</SelectItem>
                        <SelectItem value="48">2 days before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-[#FFC0CB]" />
                    <div>
                      <Label htmlFor="results">Test Results</Label>
                      <p className="text-xs text-[#A9A9A9]">Notify when test results are available</p>
                    </div>
                  </div>
                  <Switch
                    id="results"
                    checked={settings.resultNotifications}
                    onCheckedChange={(val) => handleSettingChange('resultNotifications', val)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gift size={20} className="text-[#FFC0CB]" />
                    <div>
                      <Label htmlFor="promo">Promotional Emails</Label>
                      <p className="text-xs text-[#A9A9A9]">Receive offers and health tips</p>
                    </div>
                  </div>
                  <Switch
                    id="promo"
                    checked={settings.promotionalEmails}
                    onCheckedChange={(val) => handleSettingChange('promotionalEmails', val)}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSaveSettings}
              className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white"
            >
              <Save size={16} className="mr-2" />
              Save Preferences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
